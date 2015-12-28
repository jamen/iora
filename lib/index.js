import Server from './server';

/**
 * index.js - Library wrapper
 * @return {Server} A new server.
 */
function iora() {
  return new Server();
}

export default iora;
