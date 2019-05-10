<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            mapWindowEventTrigger - Window Events
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container content">
        <p>
          <prism inline>mapWindowEventTrigger</prism> is a convenience helper
          for automatically mapping to any event that is fired on the window.
        </p>

        <h2>Example</h2>
        <div>
          The window scroll position is: <strong>{{ isDownThePage }}</strong>
        </div>

        <h2>&lt;template&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="html">
          The window scroll position is: {{ openVar }} isDownThePage {{ closeVar }}
        </prism>

        <h2>&lt;script&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="javascript">
          import { mapWindowEventTrigger, mapComputedTrigger } from 'vue-computed-triggers';

          export default {
            mixins: [
              // trigger on the window scroll event
              mapWindowEventTrigger('scroll')
            ],
            computed: {
              // all triggers mapped with mapWindowEventTrigger are named as window.eventname
              ...mapComputedTrigger('window.scroll', {
                isDownThePage() {
                  return window.scrollY > 50 ? 'down the page' : 'at the top';
                }
              })
            }
          };
        </prism>

        <p>
          You could replicate this same behavior using
          <prism inline>mapTrigger</prism>, the helper just saves you from
          having to manually bind and unbind the triggering event.
        </p>

        <!-- prettier-ignore -->
        <prism language="javascript">
          import { mapTrigger, mapComputedTrigger } from 'vue-computed-triggers';
          export default {
            mixins: [
              mapTrigger({
                name: 'window.scroll',
                trigger(updateComputed) {
                  this.onScrollFn = updateComputed;
                  window.addEventListener('scroll', this.onScrollFn);
                },
                destroy() {
                  window.removeEventListener('scroll', this.onScrollFn);
                }
              })
            ],
            computed: {
              ...mapComputedTrigger('window.scroll', {
                isDownThePage() {
                  return window.scrollY > 50 ? 'down the page' : 'at the top';
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
  mixins: [mapWindowEventTrigger('scroll')],
  computed: {
    ...mapComputedTrigger('window.scroll', {
      isDownThePage() {
        return window.scrollY > 50 ? 'down the page' : 'at the top';
      }
    })
  },
  storyOf: 'mapWindowEventTrigger',
  storyDescription: 'Window Events'
};
</script>

<style lang="scss"></style>
