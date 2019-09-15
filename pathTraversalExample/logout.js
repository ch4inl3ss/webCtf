var http_util = require('./http_util');

exports.logout = function logout(req, resp) {

    resp.writeHead(303, {
        'Location' : "/",
        'Set-Cookie': "login=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
        'Content-Type': 'text/html'
    });
    resp.end();
}