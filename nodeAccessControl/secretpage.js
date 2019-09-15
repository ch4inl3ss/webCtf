var http_util = require('./http_util');
var login_page = require('./login');

exports.showSecretPage = function buildSecretPage(req, resp, error_message) {

    var list = parseCookies(req);

    if (list.login && list.login == "true") {

        var page_title = "Super Secret Page";

        var page_menu = http_util.pageMenu();

        var page_content = "<h1>You are successfully logged in...</h1>";

        // Generate home page with page template and special title, menu and content.
        var page_data = http_util.buildPage(page_title, page_menu, page_content);

        resp.writeHead(200, { 'Content-Type': 'text/html' });

        resp.end(page_data); 
    }else{
        login_page.buildLoginPage(req, resp, "Please Login again")
    }


}

function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}