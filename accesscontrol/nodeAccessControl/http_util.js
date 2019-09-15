var http_url = require('url');


/* This function will parse client request query string and passe out related query parameter and value.*/
exports.getUrlParams = function(req, resp){
   
   req.query_url = http_url.parse(req.url, true);
   req.user_name = req.query_url.username;
   console.log(req.username);
   req.password = req.query_url.password;
   console.log(req.password);
   req.email = req.query_url.email;
   req.mobile_phone = req.query_url.mobile_phone;
   req.home_phone = req.query_url.home_phone;
   
}

/* This function will return web page navigation menu html source code. */
exports.pageMenu = function(){

var menu=`
    <div class="container" style="width:30%; margin-top:10px;">
        <ul class="nav">
            <li class="nav-item">
                <a class="nav-link active" href="/">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/register">Register</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
            </li>
        </ul>
    </div>
`;

   return menu;
}


/* This function will use input parameter to replace place holder in the page template file. */
exports.buildPage = function(page_title, page_menu, page_content){
   
   var page_template = "<html>" +
         "<head>" +
         "<title>{page_title}</title>" +
         "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">"+
         "</head>" +
         "<body>" +
         "{page_menu}" +
         "{page_content}" +
         "</body></html>";
   
   var ret = page_template;
   ret = ret.replace("{page_title}", page_title, "g");
    ret = ret.replace("{page_menu}", page_menu, "g");
    ret = ret.replace("{page_content}", page_content, "g");

   return ret;
      
}