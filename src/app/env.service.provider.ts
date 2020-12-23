import { EnvService } from './env.service';

export const EnvServiceFactory = () => {
  const env = new EnvService();
  const browserWindow = window || {};
  const browserWindowEnv = browserWindow['__env'] || {};
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      env[key] = window['__env'][key];
    }
  }
  console.log('env---',env);
  return env;
};
export default { EnvServiceFactory };