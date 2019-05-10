/**
 * Generates the function that becomes the computed on the component.
 * The trick is in accessing the custom data property that the triggers
 * we care about are updating, so that vue knows the computed depends on it.
 *
 * @private
 * @param {array} triggers The array of triggering events
 * @param {object} computeds object of computeds
 * @param {string} prop the computed we are dealing with
 */
function generateTriggerAccessFn(triggers, computeds, prop) {
  if (typeof computeds[prop] === 'function') {
    //if its a regular computed (as a function)
    return function() {
      //use this to access the getter and tell vue the computed depends
      //on this generated property
      triggers.forEach(trigger => {
        this[`mapped_trigger_data-${trigger}`];
      });
      //call the actual computed (ensure this is set to the component)
      return computeds[prop].bind(this)();
    };
  } else if (typeof computeds[prop] === 'object') {
    //its a computed object, probably with a getter/setter
    return {
      ...computeds[prop],
      get() {
        triggers.forEach(trigger => {
          this[`mapped_trigger_data-${trigger}`];
        });
        if (computeds[prop].get) {
          //call the actual computed (ensure this is set to the component)
          return computeds[prop].get.bind(this)();
        }
      }
    };
  }
}

/**
 * Normalizes the trigger list to an array and generates the object that gets
 * returned as the list of computeds.
 *
 * @param {array|string} trigger an array of string trigger names or a single trigger name
 * @param {object} computeds an object of vue computed functions
 */
function mapComputedTrigger(trigger, computeds) {
  if (!Array.isArray(trigger)) {
    trigger = [trigger];
  }
  const toReturn = {};
  for (const prop in computeds) {
    toReturn[prop] = generateTriggerAccessFn(trigger, computeds, prop);
  }
  return toReturn;
}

/**
 * Map a trigger name to a custom trigger function.  The setup function is
 * passed a method that should be called whenever the computed should be updated.
 * The destroy function will be called during the beforeDestroy component lifecycle
 * hook and allows for unbinding/cleanup.
 *
 * @param {config} triggerConfig The config for a trigger
 * @param {string} triggerConfig.name The trigger name
 * @param {trigger} triggerConfig.trigger The trigger setup function, passed a method that should be called when the computed is to be updated
 * @param {destroy} triggerConfig.destroy The trigger teardown function
 */
function mapTrigger({ name, trigger, destroy }) {
  const mixin = {
    data: () => ({
      [`mapped_trigger_data-${name}`]: 0
    }),
    mounted() {
      //fire mounted on next tick so that it happens *after* any other
      //mounted events.  TODO replace this hack with a custom mounted
      //merge strategy so it just happens last
      setTimeout(() => {
        //ensure this is set to the component
        trigger.call(this, () => {
          this[`mapped_trigger_data-${name}`]++;
        });
      });
    },
    beforeDestroy() {
      if (destroy) {
        destroy.call(this);
      }
    }
  };
  return mixin;
}

/**
 * Map a trigger to an event fired by the window.  Will automatically map the
 * name to window.eventName
 *
 * @param {string} eventName The event name to listen for on window and trigger
 */
function mapWindowEventTrigger(eventName) {
  return mapElementEventTrigger({
    element: () => window,
    event: eventName,
    name: `window.${eventName}`
  });
}

/**
 * Map a trigger to an event fired by the document.  Will automatically map the
 * name to document.eventName
 *
 * @param {string} eventName The event name to listen for on document and trigger
 */
function mapDocumentEventTrigger(eventName) {
  return mapElementEventTrigger({
    element: () => document,
    event: eventName,
    name: `document.${eventName}`
  });
}

/**
 * Map a trigger name to an event fired by an element.
 *
 * @param {object} triggerConfig
 * @param {function} element The function that returns an element to bind to
 * @param {string} event The event name to listen for on element and trigger
 * @param {string} name The trigger name
 */
function mapElementEventTrigger({ element, event, name }) {
  let computedUpdateFn;
  let el;
  return mapTrigger({
    name,
    trigger(updateComputed) {
      computedUpdateFn = updateComputed;
      el = element.call(this);
      el.addEventListener(event, computedUpdateFn);
    },
    destroy() {
      el.removeEventListener(event, computedUpdateFn);
    }
  });
}

export {
  mapComputedTrigger,
  mapTrigger,
  mapWindowEventTrigger,
  mapDocumentEventTrigger,
  mapElementEventTrigger
};
