<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            mapTrigger - Basic Example
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container content">
        <p>
          You can define a trigger based on any kind of event as long as you can
          fire a method when it occurs. This shows a basic example binding to a
          window resize event.
        </p>
        <p>
          Because we are using the basic <prism inline>mapTrigger</prism> method
          instead of one of the helpers, we will be manually binding and
          unbinding the event listener for our trigger.
        </p>

        <h2>Example</h2>
        <div>The window width is: {{ windowWidth }}</div>

        <h2>&lt;template&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="html">
          The window width is: {{ openVar }} windowWidth {{ closeVar }}
        </prism>

        <h2>&lt;script&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="javascript">
          import { mapComputedTrigger, mapTrigger } from 'vue-computed-triggers';

          export default {
            mixins: [
              mapTrigger({
                //define your custom trigger with a name
                name: 'mycustomtrigger',
                trigger(updateComputed) {
                  //cache the method because we are binding an event listner
                  //and we want to make sure we can unbind when the component is destroyed
                  this.resizeTriggerFn = updateComputed;

                  //call updateComputed when it occurs
                  window.addEventListener('resize', this.resizeTriggerFn);
                },
                destroy() {
                  //remove the event listener when the component is destroyed
                  window.removeEventListener('resize', this.resizeTriggerFn);
                }
              })
            ],
            computed: {
              //map the computed to your trigger
              ...mapComputedTrigger('mycustomtrigger', {
                //it will now be recomputed any time your trigger fires
                windowWidth() {
                  return window.innerWidth;
                }
              }),
            }
          }
        </prism>
      </div>
    </section>
  </div>
</template>

<script>
import { mapTrigger, mapComputedTrigger } from '@/index.js';

export default {
  mixins: [
    mapTrigger({
      name: 'mycustomtrigger',
      trigger(updateComputed) {
        this.resizeTriggerFn = updateComputed;
        window.addEventListener('resize', this.resizeTriggerFn);
      },
      destroy() {
        window.removeEventListener('resize', this.resizeTriggerFn);
      }
    })
  ],
  computed: {
    ...mapComputedTrigger('mycustomtrigger', {
      windowWidth() {
        return window.innerWidth;
      }
    })
  },
  storyOf: 'mapTrigger',
  storyDescription: 'Basic Example'
};
</script>

<style lang="scss"></style>
