export function injectConfig() {
  const moduleName = arguments[2] || arguments[1];
  const application = (typeof arguments[1] !== 'string') ? arguments[1] : arguments[0];
  const config = application.resolveRegistration('config:environment');
  const { metricsAdapters = [] } = config;
  const { environment = 'development' } = config;
  const options = { metricsAdapters, environment };

  application.register(`config:${moduleName}`, options, { instantiate: false });
  application.inject(`service:${moduleName}`, 'options', `config:${moduleName}`);
}

export function initialize() {
  injectConfig(...arguments, 'metrics');
}

export default {
  name: 'metrics',
  initialize
};
