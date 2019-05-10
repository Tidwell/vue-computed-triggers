<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            mapDocumentEventTrigger - Document Events
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container content">
        <p>
          <prism inline>mapDocumentEventTrigger</prism> is a convenience helper
          for automatically mapping to any event that is fired on the document.
        </p>
        <p>
          It automatically handles binding the event listener when the component
          is created, and also unbinding when the component is destroyed.
        </p>

        <h2>Example</h2>
        <div>
          The text that is currently selected on the page is:
          <br />
          <strong>{{ currentlySelected }}</strong>
          <br />
        </div>

        <h2>&lt;template&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="html">
          &lt;div&gt;
              The text that is currently selected on the page is:
            &lt;br /&gt;
            &lt;strong&gt;{{ openVar }} currentlySelected {{ closeVar }}&lt;/strong&gt;
            &lt;br /&gt;
          &lt;/div&gt;
        </prism>

        <h2>&lt;script&gt;</h2>
        <!-- prettier-ignore -->
        <prism language="javascript">
          import { mapDocumentEventTrigger, mapComputedTrigger } from 'vue-computed-triggers';

          export default {
            mixins: [
              mapDocumentEventTrigger('selectionchange')
            ],
            computed: {
              ...mapComputedTrigger('document.selectionchange', {
                currentlySelected() {
                  return document.getSelection();
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
                name: 'document.selectionchange', 
                trigger(updateComputed) {
                  this.onSelectionChangeFn = updateComputed;
                  document.addEventListener('selectionchange', this.onSelectionChangeFn);
                },
                destroy() {
                  document.removeEventListener('selectionchange', this.onSelectionChangeFn);
                }
              })
            ],
            computed: {
              ...mapComputedTrigger('document.selectionchange', {
                currentlySelected() {
                  return document.getSelection();
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
  mixins: [mapDocumentEventTrigger('selectionchange')],
  computed: {
    ...mapComputedTrigger('document.selectionchange', {
      currentlySelected() {
        return document.getSelection();
      }
    })
  },
  storyOf: 'mapDocumentEventTrigger',
  storyDescription: 'Document Events'
};
</script>

<style lang="scss"></style>
