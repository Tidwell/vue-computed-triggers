<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Advanced Usage - Multiple Computeds
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container content">
        <p>
          You can have multiple computed properties respond to the same
          event trigger.
        </p>

        <h2>Example</h2>
        <div>
          The widow is: {{ isSmallOrWide }}
          <br />
          The window aspect ratio is: {{ aspectRatio }}
        </div>

        <h2>&lt;template&gt;</h2>
        <prism language="html">
            The widow is: {{openVar}} isSmallOrWide {{closeVar}}
          &lt;br /&gt;
            The window aspect ratio is: {{openVar}} aspectRatio {{closeVar}}
        </prism>

        <h2>&lt;script&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="javascript">
          import { mapWindowEventTrigger, mapComputedTrigger } from '@/index.js';

          export default {
            mixins: [
              mapWindowEventTrigger('resize')
            ],
            computed: {
              ...mapComputedTrigger('window.resize', {
                isSmallOrWide() {
                  return window.innerWidth > 1200 ? 'wide' : 'small';
                },
                aspectRatio() {
                  return window.innerWidth / window.innerHeight;
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
  import {
    mapWindowEventTrigger,
    mapComputedTrigger
  } from '@/index.js';

  export default {
    mixins: [
      mapWindowEventTrigger('resize')
    ],
    computed: {
      ...mapComputedTrigger('window.resize', {
        isSmallOrWide() {
          return window.innerWidth > 1200 ? 'wide' : 'small';
        },
        aspectRatio() {
          return window.innerWidth / window.innerHeight;
        }
      })
    },
    storyOf: 'Advanced Usage',
    storyDescription: 'Multiple Computeds'
  };
</script>

<style lang="scss">
</style>
