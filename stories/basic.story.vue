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
              //define your custom trigger with a name
              mapTrigger('mycustomtrigger', (updateComputed) => {
                //call updateComputed when it occurs
                window.addEventListener('resize', updateComputed);
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
    mapTrigger('mycustomtrigger', updateComputed => {
      window.addEventListener('resize', updateComputed);
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
