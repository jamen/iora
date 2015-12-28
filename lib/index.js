import Server from './server';
import info from '../package';

/**
 * index.js - Library wrapper
 * @return {Server} A new server.
 */
function iora() {
  return new Server();
}

Object.assign(iora, {
  // Library
  Server,

  // Meta
  version: info.version,
  license: info.license,
});

export default iora;
