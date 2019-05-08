<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            mapElementEventTrigger - Element DOM Events
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container content">
        <p>
          <prism inline>mapElementEventTrigger</prism> is a convenience method
          for attaching to events fired by arbitrary DOM elements.
        </p>

        <h2>Example</h2>
        <div>
          Element is scrolled by: {{ scrollableElementPosition }}
          <div class="scrollable-element">
            <div />
          </div>
        </div>

        <h2>&lt;template&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="html">
             Element is scrolled by: {{ openVar }} scrollableElementPosition {{ closeVar }}
          &lt;div class="scrollable-element"&gt;
            &lt;div /&gt;
          &lt;/div&gt;
        </prism>

        <h2>&lt;script&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="javascript">
          import { mapElementEventTrigger, mapComputedTrigger } from 'vue-computed-triggers';

          export default {
            mixins: [
              mapElementEventTrigger({
                // a method that will be called after the component mounted lifecycle
                // hook that should return the element to listen for an event for
                // cannot be passed as arrow function or else you will lose the `this` context of the component
                element() {
                  return this.scrollableElement
                },
                // the event to listen for
                event: 'scroll',
                // a custom trigger name for the event
                triggerName: 'myscrollelement.scroll'
              })
            ],
            mounted() {
              // mounted will fire before the element() method
              this.scrollableElement = this.$el.querySelector('.scrollable-element');
            },
            computed: {
              // map to the custom trigger name defined on the call to mapElementEventTrigger
              ...mapComputedTrigger('myscrollelement.scroll', {
                // define the computed
                scrollableElementPosition() {
                  if (!this.scrollableElement) { return 0; }
                  return this.scrollableElement.scrollTop;
                }
              })
            }
          };
        </prism>

        <h2>&lt;style&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="css">
          .scrollable-element {
            max-height: 100px;
            overflow-y: scroll;
            border: 1px solid;
          }
          .scrollable-element > div {
            height: 400px;
            background: red;
            margin: 1em;
          }
        </prism>
      </div>
    </section>
  </div>
</template>

<script>
import { mapElementEventTrigger, mapComputedTrigger } from '@/index.js';

export default {
  mixins: [
    mapElementEventTrigger({
      element() {
        return this.scrollableElement;
      },
      event: 'scroll',
      triggerName: 'myscrollelement.scroll'
    })
  ],
  mounted() {
    this.scrollableElement = this.$el.querySelector('.scrollable-element');
  },
  computed: {
    ...mapComputedTrigger('myscrollelement.scroll', {
      scrollableElementPosition() {
        if (!this.scrollableElement) {
          return 0;
        }
        return this.scrollableElement.scrollTop;
      }
    })
  },
  storyOf: 'mapElementEventTrigger',
  storyDescription: 'Element DOM Events'
};
</script>

<style lang="scss" scoped>
.scrollable-element {
  max-height: 100px;
  overflow-y: scroll;
  border: 1px solid;
}
.scrollable-element > div {
  height: 400px;
  background: red;
  margin: 1em;
}
</style>
