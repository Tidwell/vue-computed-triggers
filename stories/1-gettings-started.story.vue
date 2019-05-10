<template>
  <div>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            vue-computed-triggers
            <br />
            Getting Started - Quick Start
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container content">
        <h4 class="title is-4">
          About
        </h4>
        <p>
          <prism inline>vue-computed-triggers</prism> is a utility library for
          creating computed properties that respond to arbitrary event triggers.
        </p>
        <p>
          This avoids managing event listeners inside your component,
          and enables computed properties to work as you would expect, even
          when using values derived from outside your component.
        </p>
        <p>
          Even better, these evented computeds still have all the behavior of regular
          computed properties.  They update whenever any properties they
          depend on are updated.  They can have setters and getters, and they can
          even use state, getters, etc from vuex.
        </p>
        <p>Some example use cases:</p>
        <ul>
          <li>DOM Events (scroll, resize, video or audio events, etc)</li>
          <li>3rd party library events</li>
          <li>Timers</li>
          <li>Socket or Webworker Messages</li>
          <li>Literally anything that allows you to fire a callback</li>
        </ul>
        <h4 class="title is-4">
          Install
        </h4>
        <p>
          Install with npm
        </p>
        <prism>
          $ npm install vue-computed-triggers --save
        </prism>
        <p>
          1. Import the methods you need in your component.
        </p>
        <p>
          2. Use one of the <prism inline>mapTrigger</prism> methods to define a trigger in the
          component mixins.
        </p>
        <p>
          3. Use <prism inline>mapComputedTrigger</prism> to create a computed that reacts to the trigger.
        </p>
        <!-- prettier-ignore -->
        <prism language="javascript">
          import { mapWindowEventTrigger, mapComputedTrigger } from 'vue-computed-triggers';

          export default {
            mixins: [
              // trigger on the window scroll event
              mapWindowEventTrigger('scroll')
            ],
            computed: {
              ...mapComputedTrigger('window.scroll', {
                scrollPosition() {
                  return window.scrollY;
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
export default {
  storyOf: 'Getting Started',
  storyDescription: 'Quick Start'
};
</script>

<style lang="scss" scoped>
</style>
