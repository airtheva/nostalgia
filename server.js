var util = require("util");
var http = require("http");
var formidable = require("formidable");

var handlers = require("./handlers");

var GetHandlers = 
{
	"/": handlers.GetRoot,
	"/posts": handlers.GetPosts
};

var PostHandlers = 
{
	
};

function route(uri, method, data, res)
{
	// When method == GET, data = query object.
	// When method == POST, data = formidable.IncomingForm.
	if(method == "GET" && typeof GetHandlers[uri] === "function")
	{
		GetHandlers[uri](data, res);
	}
	else if(method == "POST" && typeof PostHandlers[uri] === "function")
	{
		PostHandlers[uri](data, res);
	}
	else
	{
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.write("404 Not Found!");
		res.end();
	}
}

http.createServer(function(req, res)
{
	var url = require("url").parse(req.url, true);
	switch(req.method.toUpperCase())
	{
	case "GET":
		route(url.pathname, "GET", url.query, res);
		break;
	case "POST":
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files)
		{
			console.log("IncomingForm recieved.");
			var data = { "fields": fields, "files": files };
			console.log(util.inspect(data));
			route(url.pathname, "POST", data, res);
		});
		break;
	default:
		break;
	}
}).listen(8080, "127.0.0.1");
 console.log("Server running.");
