import { configure, storiesOf, addParameters } from '@storybook/vue';

import theme from './theme';

import path from 'path';

import Vue from 'vue';

//import custom styles for storybook
import './storybook.scss';

//use prism for syntax highlighting
import 'prismjs';
import 'prismjs/components/prism-scss';
import 'prismjs/themes/prism.css';
import Prism from 'vue-prism-component';

Vue.component('prism', Prism);

Vue.mixin({
  data() {
    return {
      'openVar': '{{',
      'closeVar': '}}'
    };
  }
});

//storybook options
//see: https://github.com/storybooks/storybook/tree/master/addons/options
// setOptions({
//   showAddonPanel: false
// });
addParameters({
  options: {
    showPanel: false,
    theme
  }
});

// Load .story.vue files
const vueStoryLoader = require.context('../stories', true, /\.story\.vue$/);
function loadVueStories() {
  vueStoryLoader.keys().forEach(filename => {
    const story = vueStoryLoader(filename);
    const name =
      story.default.storyOf ||
      path.basename(filename).replace('.story.vue', '');
    const description = story.default.storyDescription || 'no description';

    storiesOf(name, module).add(description, () => story.default);
  });
}
configure(loadVueStories, module);

// Load stories defined in stories/
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
