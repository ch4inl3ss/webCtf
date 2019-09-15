var http_util = require('./http_util');

/* This method will show home page with welcome message. */
exports.showHomePage = function buildHomePage(req, resp, error_message) {

    var page_title = "Home Page";

    var page_menu = http_util.pageMenu();

    var page_content = "<h1>Welcome to user register and login home page.<br/>Click above link to take action.</h1>";

    // Generate home page with page template and special title, menu and content.
    var page_data = http_util.buildPage(page_title, page_menu, page_content);

    resp.writeHead(200, { 'Content-Type': 'text/html' });

    resp.end(page_data);
}
