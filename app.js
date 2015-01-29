var os = require('os');
var Hapi = require('hapi');

var params = [
  'tmpdir',
  'endianness',
  'hostname',
  'type',
  'platform',
  'arch',
  'release',
  'uptime',
  'loadavg',
  'totalmem',
  'freemem',
  'cpus',
  'networkInterfaces',
  'EOL'
];

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 1337
});

// route home
server.route({
  method: 'GET',
  path:'/',
  handler: function (request, reply) {
    reply.redirect('http://nodejs.org/api/os.html');
  }
});

// route method
server.route({
  method: 'GET',
  path:'/{method}',
  handler: function (request, reply) {
    if (params.indexOf(request.params.method) != -1) {
      reply(os[request.params.method]());
    }
  }
});

// Start the server
server.start();
