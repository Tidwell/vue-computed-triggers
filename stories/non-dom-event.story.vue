<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            mapTrigger - Non-DOM Event
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container content">
        <p>
          You may have a 3rd party script that fires an event, and updates its
          own global state. This is especially common with ads or analytics.
        </p>
        <p>
          This example simulates the arbitrary events by firing on a timer.
        </p>

        <h2>Example</h2>
        <div>
          <prism inline>window.someGlobalVariable</prism> gets updated on a
          timer: {{ someGlobalVariable }}
        </div>

        <h2>&lt;template&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="html">
          window.someGlobalVariable gets updated on a timer:
          {{ openVar }} someGlobalVariable {{ closeVar }}
        </prism>

        <h2>&lt;script&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="javascript">
          window.someGlobalVariable = 1;

          import { mapComputedTrigger, mapTrigger } from 'vue-computed-triggers';

          export default {
            mixins: [
              mapTrigger('mycustomtrigger', (updateComputed) => {
                setInterval(() => {
                  window.someGlobalVariable += 1;
                  updateComputed();
                }, 500);
              })
            ],
            computed: {
              ...mapComputedTrigger('mycustomtrigger', {
                someGlobalVariable() {
                  return window.someGlobalVariable;
                }
              }),
            },
            storyOf: 'Examples/Basic Non-DOM Event',
            storyDescription: 'A custom trigger unrelated to a DOM event'
          };
        </prism>
      </div>
    </section>
  </div>
</template>

<script>
window.someGlobalVariable = 1;

import { mapTrigger, mapComputedTrigger } from '@/index.js';

export default {
  mixins: [
    mapTrigger('mycustomtrigger', updateComputed => {
      setInterval(() => {
        window.someGlobalVariable += 1;
        updateComputed();
      }, 500);
    })
  ],
  computed: {
    ...mapComputedTrigger('mycustomtrigger', {
      someGlobalVariable() {
        return window.someGlobalVariable;
      }
    })
  },
  storyOf: 'mapTrigger',
  storyDescription: 'Non-DOM event'
};
</script>

<style lang="scss"></style>
