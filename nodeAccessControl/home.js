var http_util = require('./http_util');

exports.showHomePage = function buildHomePage(req, resp, error_message) {

    var page_title = "Home Page";

    var page_menu = http_util.pageMenu();

    var page_content = `
    <div class="container" style="width:30%; margin-top:50px;">
    
    <h1>Access Control Example</h1>

    </div>
    `;

    // Generate home page with page template and special title, menu and content.
    var page_data = http_util.buildPage(page_title, page_menu, page_content);

    resp.writeHead(200, { 'Content-Type': 'text/html' });

    resp.end(page_data);
}
