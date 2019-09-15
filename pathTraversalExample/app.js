var http = require('http');
var http = require('http');
var http_util = require('./http_util');
var home_module = require('./home');
var login_module = require('./login');
var secret_module=require('./secretpage');
var logout_module=require('./logout')
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("../");

var server = http.createServer(function(req, resp) {
  

  http_util.getUrlParams(req, resp);

  var url_path = req.query_url.pathname;

  if (url_path === '/') {
      home_module.showHomePage(req, resp);
  } else if (url_path === '/login') {
      login_module.showLoginPage(req, resp);
  } else if (url_path === '/check-login') {
      login_module.checkLoginAccount(req, resp);
  } else if (url_path === '/secret-page'){
      secret_module.showSecretPage(req,resp);
  } else if (url_path === '/logout') {
      logout_module.logout(req,resp);
  } else{
    var done = finalhandler(req, resp);
    serve(req, resp, done);
  }


});

server.listen(3000);
console.log("server up and running on port 3000");