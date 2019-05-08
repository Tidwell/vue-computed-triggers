function generateTriggerAccessFn(trigger, computeds, prop) {
  if (typeof computeds[prop] === 'function') {
    //if its a regular computed (as a function)
    return function() {
      //use this to access the getter and tell vue the computed depends
      //on this generated property
      this[`mapped_trigger_data-${trigger}`];
      //call the actual computed (ensure this is set to the component)
      return computeds[prop].bind(this)();
    };
  } else if (typeof computeds[prop] === 'object') {
    //its a computed object, probably with a getter/setter
    return {
      ...computeds[prop],
      get() {
        this[`mapped_trigger_data-${trigger}`];
        if (computeds[prop].get) {
          //call the actual computed (ensure this is set to the component)
          return computeds[prop].get.bind(this)();
        }
      }
    };
  }
}

function mapComputedTrigger(trigger, computeds) {
  const toReturn = {};
  for (const prop in computeds) {
    toReturn[prop] = generateTriggerAccessFn(trigger, computeds, prop);
  }
  return toReturn;
}

function mapTrigger(triggerName, triggerSetupFn) {
  const mixin = {
    data: () => ({
      [`mapped_trigger_data-${triggerName}`]: 0
    }),
    mounted() {
      //fire mounted on next tick so that it happens *after* any other
      //mounted events.  TODO replace this hack with a custom mounted
      //merge strategy so it just happens last
      setTimeout(() => {
        //ensure this is set to the component
        triggerSetupFn.call(this, () => {
          this[`mapped_trigger_data-${triggerName}`]++;
        });
      });
    }
  };
  return mixin;
}

function mapWindowEventTrigger(eventName) {
  const newEventName = `window.${eventName}`;
  return mapTrigger(newEventName, function(updateComputed) {
    window.addEventListener(eventName, updateComputed);
  });
}

function mapDocumentEventTrigger(eventName) {
  const newEventName = `document.${eventName}`;
  return mapTrigger(newEventName, function(updateComputed) {
    document.addEventListener(eventName, updateComputed);
  });
}

function mapElementEventTrigger({ element, event, triggerName }) {
  return mapTrigger(triggerName, function(updateComputed) {
    const el = element.call(this);
    el.addEventListener(event, updateComputed);
  });
}

export {
  mapComputedTrigger,
  mapTrigger,
  mapWindowEventTrigger,
  mapDocumentEventTrigger,
  mapElementEventTrigger
};
