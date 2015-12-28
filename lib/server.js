import http from 'http';

/**
 * The server object.
 */
class Server {
  constructor(server = (new http.Server())) {
    this.server = server;
  }
}

export default Server;
