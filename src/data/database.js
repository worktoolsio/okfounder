import localStorageDB from "localstoragedb"
// Uses https://github.com/knadh/localStorageDB

// Initialise. If the database doesn't exist, it is created

////////////////////////////////////////////////
// Change the dbName if you change the schema or
// initial data to reset the db
const dbName = "userData_2"
/////////////////////////////////////////////////

var db = new localStorageDB(dbName, localStorage);

// Check if the database was just created. Useful for initial database setup
if( !db.tableExists("posts")) {

    // create the "posts" table
	db.createTable("posts", ["user", "title"]);

	// insert some data
	db.insert("posts", {user: "billgates", title: "Microsoft is great"});
	db.insert("posts", {user: "billgates", title: "It looks like you're writing a letter"});
	db.insert("posts", {user: "stevejobs", title: "It just works"});

	// commit the database to localStorage
	// all create/drop/insert/update/delete operations should be committed
	db.commit();
}

if (!db.tableExists("users")) {
	db.createTable("users", ["username", "email", "fullName", "pitch", "tags"]);
	db.insert("users", {
		username: "billgates",
		email: "bill@microsoft.com",
		fullName: "Bill Gates",
		pitch: "Build world dominating OS",
		tags: "PCs, Productivity, Money"
	})
	db.insert("users", {
		username: "stevejobs",
		email: "steeve@apple.com",
		fullName: "Steeve Jobs",
		pitch: "Think different",
		tags: "computers, typography, design"
	})
	db.commit();
}

if (!db.tableExists("followers")) {
	db.createTable("followers", ["user", "follower"]);
	db.commit();
}

export default db