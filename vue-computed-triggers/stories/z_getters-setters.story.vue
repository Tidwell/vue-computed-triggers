<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Advanced Usage - Computed Getters & Setters
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container content">
        <p>
          You can define getters and setters for a computed, just as you would
          with non-evented computed properties.  By having setters call methods
          that, in turn, fire events, you can get very expressive computed
          properties.
        </p>
        <p>
          This example uses mapDocumentEventTrigger, but all mapTrigger methods
          accept get and set properties, just like normal computeds.
        </p>

        <h2>Example</h2>
        <div>
          <p>
            Fullscreen Status: {{ isFullscreen ? 'Fullscreen' : 'Not Fullscreen' }}
          </p>
          <button
            class="button"
            @click="isFullscreen ? isFullscreen = false : isFullscreen = true;">
            
            {{ isFullscreen ? 'Exit fullscreen' : 'Go fullscreen' }}
          
          </button>
        </div>

        <h2>&lt;template&gt;</h2>
        <prism language="html">
          &lt;div&gt;
            &lt;p&gt;
                Fullscreen Status: {{openVar}} isFullscreen ? 'Fullscreen' : 'Not Fullscreen' {{closeVar}}
            &lt;/p&gt;
            &lt;button
              class="button"
              @click="isFullscreen ? isFullscreen = false : isFullscreen = true;"&gt;
                {{openVar}} isFullscreen ? 'Exit fullscreen' : 'Go fullscreen' {{closeVar}}
            &lt;/button&gt;
          &lt;/div&gt;
        </prism>

        <h2>&lt;script&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="javascript">
          import { mapDocumentEventTrigger, mapComputedTrigger } from '@/index.js';

          export default {
            mixins: [
              mapDocumentEventTrigger('fullscreenchange')
            ],
            computed: {
              ...mapComputedTrigger('document.fullscreenchange', {
                isFullscreen: {
                  // the getter is recomputed any time the trigger fires
                  get() {
                    return !!document.fullscreenElement; //type-convert to a boolean
                  },
                  // setting the computed now fires methods that, in turn, fire the fullscreenchange event
                  set(newVal) {
                    if (newVal) {
                      document.body.requestFullscreen();
                    } else {
                      document.exitFullscreen();
                    }
                  }
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
  import { mapDocumentEventTrigger, mapComputedTrigger } from '@/index.js';

  export default {
    mixins: [
      mapDocumentEventTrigger('fullscreenchange')
    ],
    computed: {
      ...mapComputedTrigger('document.fullscreenchange', {
        isFullscreen: {
          get() {
            return !!document.fullscreenElement;
          },
          set(newVal) {
            if (newVal) {
              document.body.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }
        }
      })
    },
    storyOf: 'Advanced Usage',
    storyDescription: 'Computed Getters & Setters'
  };
</script>

<style lang="scss">
</style>
