/**
* Dependencies.
*/
var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var cacheBuster = require('..');
var Path = require('Path');
var Cheerio = require('cheerio');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var before = lab.before;
var it = lab.it;
var expect = Code.expect;

describe('Hapi Cache Buster', function(){

  it('busts cache a custom version', function(done){

      var server = new Hapi.Server();
      server.connection();

      // Setup the views engine and folder
      server.views({
          engines: {
              html: require('swig')
          },
          path: Path.join(__dirname, './views')
      });

      server.route({
        method: 'GET',
        path: '/test',
        config: {
          handler: function (request, reply) {
              reply.view('index');
          }
        }
      });

      server.register([
        {
          register: cacheBuster,
          options: {
            version: 55
          }
        },
      ], function(err){
        expect(err).to.not.exist();

        server.inject({method: 'GET', url: '/test'}, function(response){
          var $ = Cheerio.load(response.payload);
          expect($('h1').text()).to.equal('?v=55');
          done();
        });


      });

  });

  it('busts cache with package.json version number in the node process current working directory', function(done){

      var server = new Hapi.Server();
      server.connection();

      // Setup the views engine and folder
      server.views({
          engines: {
              html: require('swig')
          },
          path: Path.join(__dirname, './views')
      });

      server.route({
        method: 'GET',
        path: '/test',
        config: {
          handler: function (request, reply) {
              reply.view('index');
          }
        }
      });

      server.register([
        {
          register: cacheBuster
        },
      ], function(err){
        expect(err).to.not.exist();

        server.inject({method: 'GET', url: '/test'}, function(response){
          var $ = Cheerio.load(response.payload);
          expect($('h1').text()).to.equal('?v=040');
          done();
        });

      });

  });

});
