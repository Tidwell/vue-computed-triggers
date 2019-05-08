//This is the wepback config used for storybook
const path = require('path');

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'

  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  });

  // // Add js, json and vue extension support
  config.resolve.extensions.push('.json');

  // Add alias for @ pointing to src
  config.resolve.alias['@'] = path.resolve(__dirname, '../src');

  //keep this for use in debugging
  console.dir(config, { depth: null }) || config;

  // Return the altered config
  return config;
};
