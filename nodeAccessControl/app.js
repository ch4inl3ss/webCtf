var http = require('http');
var http_util = require('./http_util');
var home_module = require('./home');
var login_module = require('./login');
var secret_module=require('./secretpage');
var register_module = require('./register');

var http_server_port = 3000;

var http_server_callback_function = function (req, resp) {

    http_util.getUrlParams(req, resp);

    var url_path = req.query_url.pathname;

    if (url_path === '/') {
        home_module.showHomePage(req, resp);
    } else if (url_path === '/login') {
        login_module.showLoginPage(req, resp);
    } else if (url_path === '/check-login') {
        console.log("going to checkLoginAcc");
        login_module.checkLoginAccount(req, resp);
    } else if (url_path === '/secret-page'){
        secret_module.showSecretPage(req,resp);
    } else if (url_path === '/register') {
        register_module.showRegisterPage(req, resp);
    } else if (url_path === '/register-submit') {
        register_module.registerSubmit(req, resp);
    } else {
        resp.writeHead(404, { 'Content-Type': 'text/html' });
        resp.end("Request url is not valid : " + req.url.toString());
    }
}

var http_server = http.createServer(http_server_callback_function);
http_server.listen(http_server_port);
console.log('http server lisetning on port ' + http_server_port);