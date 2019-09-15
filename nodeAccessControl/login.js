var secret_module=require('./secretpage');
var http_util = require('./http_util');


exports.showLoginPage = function (req, resp) {
    buildLoginPage(req, resp, '');
}

exports.showLoginPage = function(req,resp,error){
    buildLoginPage(req,resp,error);
}


exports.checkLoginAccount = function (req, resp) {
    var query_string = require('querystring');

    if (req.method == 'POST') {

        var req_body = '';

        req.on('data', function (data) {
            req_body += data;
        });

        req.on('end', function () {

            var post_data = query_string.parse(req_body);
            var username = post_data["username"];
            var password = post_data["password"];

            // If user name and password is correct.
            if (username === 'test' && password === 'test') {
                resp.writeHead(301, {
                    'Location' : "/secret-page",
                    'Set-Cookie': 'login=' + "true",
                    'Content-Type': 'text/html'
                });
                resp.end();
            } else {
                req.username = username;
                req.password = password;

                buildLoginPage(req, resp, 'User name or password is not correct.')
            }
        });
    }
}


/* This is a private function which can only be invoked in this module.
*  This function is used to build login form page and return it to client.
* */
function buildLoginPage(req, resp, error_message) {

    http_util.getUrlParams(req, resp);

    var page_title = "Login";

    var page_menu = http_util.pageMenu();

    var login_form = "";

    if (error_message !== '' && error_message !== null && error_message !== undefined) {
        login_form +=
            "<div class=\"alert alert-primary\" role=\"alert\">" +
            error_message +
            "</div>";
    }

    login_form += html;

    if (req.username == null || req.username == undefined) {
        req.user_name = '';
    }

    if (req.password == null || req.password == undefined) {
        req.password = '';
    }

    login_form = login_form.replace("{username}", req.user_name);

    login_form = login_form.replace("{password}", req.password);

    var login_page_data = http_util.buildPage(page_title, page_menu, login_form);

    resp.writeHead(200, { 'Content-Type': 'text/html' });

    resp.end(login_page_data);
}

var html =
    `
    <div class="container" style="width:30%; margin-top:50px;">
        <h1>Login</h1>
        <form name="login" method="post" action="/check-login">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control" id="username" name="username" value="{username}" placeholder="Enter username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password" value="{password}" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
`;