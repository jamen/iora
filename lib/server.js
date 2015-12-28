import http from 'http';

/**
 * server.js - The Server class.
 */
class Server {
  constructor(server) {
    this.server = server || new http.Server(function request() {

    });
  }
}

export default Server;
