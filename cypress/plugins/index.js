import injectReactScriptsDevServer from '@cypress/react/plugins/react-scripts';

module.exports = (on, config) => {
  injectReactScriptsDevServer(on, config);

  return config;
};
