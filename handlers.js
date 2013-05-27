var fs = require("fs");
var database = require("./database");
database.Open();

function GetRoot(query, res)
{
    if(database.Database["count"] === undefined)
    {
        database.Database["count"] = 0;
    }
	database.Database["count"]++;
	console.log(database.Database["count"]);
	database.Save();
	res.writeHead(200, { "Content-Type": "text/html" });
	fs.readFile("./client.html", { "encoding": "utf-8" }, function(err, data)
	{
        res.write(data);
        res.end();
	});
}

function GetPosts(query, res)
{
	res.write("Posts");
	res.end();
}

exports.GetRoot = GetRoot;
exports.GetPosts = GetPosts;
