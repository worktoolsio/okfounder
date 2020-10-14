import localStorageDB from "localstoragedb";
// Uses https://github.com/knadh/localStorageDB

// Initialise. If the database doesn't exist, it is created

////////////////////////////////////////////////
// Change the dbName if you change the schema or
// initial data to reset the db
const dbName = "userData_2";
/////////////////////////////////////////////////

var db = new localStorageDB(dbName, localStorage);

// Check if the database was just created. Useful for initial database setup
// if (!db.tableExists("posts")) {
// 	// create the "posts" table
// 	db.createTable("posts", ["user", "title"]);

// 	// insert some data
// 	db.insert("posts", { user: "billgates", title: "Microsoft is great" });
// 	db.insert("posts", {
// 		user: "billgates",
// 		title: "It looks like you're writing a letter",
// 	});
// 	db.insert("posts", { user: "stevejobs", title: "It just works" });

// 	// commit the database to localStorage
// 	// all create/drop/insert/update/delete operations should be committed
// 	db.commit();
// }
if (!db.tableExists("users")) {
	// create the "posts" table
	db.createTable("users", ["username", "age", "failure", "com", "know", "int"]);

	// insert some data
	db.insert("users", {
		username: "Bill Gates",
		age: "22",
		failure: "10",
		com: "1",
		know: "1",
		int: "1",
	});
	db.insert("users", {
		username: "Steve Jobs",
		age: "44",
		failure: "10",
		com: "1",
		know: "1",
		int: "1",
	});
	db.insert("users", {
		username: "Larry Page",
		age: "42",
		failure: "10",
		com: "10",
		know: "10",
		int: "10",
	});
	db.insert("users", {
		username: "Rodrigo",
		age: "42",
		failure: "0",
		com: "0",
		know: "0",
		int: "0",
	});
	db.insert("users", {
		username: "Sam",
		age: "1",
		failure: "2",
		com: "3",
		know: "4",
		int: "5",
	});
	db.insert("users", {
		username: "Michael",
		age: "9",
		failure: "9",
		com: "9",
		know: "9",
		int: "9",
	});

	// commit the database to localStorage
	// all create/drop/insert/update/delete operations should be committed
	db.commit();
}

export default db;
