<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Advanced Usage - Multiple Events
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container content">
        <p>
          By passing an array as the first argument to
          <prism inline>mapComputedTrigger</prism>, you can have a computed
          property respond to multiple event triggers.
        </p>

        <h2>Example</h2>
        <div>
          The widow is: {{ windowData.width }} and is scrolled
          {{ windowData.scroll }}.
        </div>

        <h2>&lt;template&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="html">
            The widow is: {{ openVar }} windowData.width {{ closeVar }} and is scrolled {{ openVar }} windowData.scroll {{ closeVar }}.
        </prism>

        <h2>&lt;script&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="javascript">
          import { mapWindowEventTrigger, mapComputedTrigger } from 'vue-computed-triggers';

          export default {
            mixins: [
              mapWindowEventTrigger('resize'),
              mapWindowEventTrigger('scroll')
            ],
            computed: {
              ...mapComputedTrigger([
                'window.resize',
                'window.scroll'
              ], {
                windowData() {
                  return {
                    width: window.innerWidth,
                    scroll: window.scrollY
                  };
                }
              })
            }
          };
        </prism>
      </div>
    </section>
  </div>
</template>

<script>
import { mapWindowEventTrigger, mapComputedTrigger } from '@/index.js';

export default {
  mixins: [mapWindowEventTrigger('resize'), mapWindowEventTrigger('scroll')],
  computed: {
    ...mapComputedTrigger(['window.resize', 'window.scroll'], {
      windowData() {
        return {
          width: window.innerWidth,
          scroll: window.scrollY
        };
      }
    })
  },
  storyOf: 'Advanced Usage',
  storyDescription: 'Multiple Events'
};
</script>

<style lang="scss"></style>
