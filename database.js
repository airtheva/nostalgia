var fs = require("fs");

var FILE_DATABASE = "./database.json";
var INTERVAL_SAVING = 3000;

var Database = {}

function Open()
{
	fs.readFile(FILE_DATABASE, { "encoding": "utf-8" }, function(err, data)
	{
		console.log(data);
		if(data === undefined)
		{
			data = JSON.stringify(new Object());
			fs.writeFileSync(FILE_DATABASE, data, { "encoding": "utf-8" });
		}
		Database = JSON.parse(data);
	});
}

/*
function Create(key, value)
{
	Database[key] = value;
}

function Read(key)
{
	return Database[key];
}

function Update(key, value)
{
	Database[key] = value;
}

function Delete(key)
{
	delete Database[key];
}
*/

function Save()
{
	console.log("Saving.");
	fs.writeFile(FILE_DATABASE, JSON.stringify(Database), { "encoding": "utf-8" });
}

function Close()
{

}

exports.Open = Open;
//exports.Create = Create;
//exports.Read = Read;
//exports.Update = Update;
//exports.Delete = Delete;
exports.Database = Database;
exports.Save = Save;
exports.Close = Close;
