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
	db.createTable("posts", [
		"username",
		"name",
		"title",
		"bio",
		"role",
		"lookingFor",
		"hasIdea",
		"sectors",
		"locations",
		"likes"
	]);

	// insert some data
	db.insert("posts", {
		username: "bill.gates@microsoft.com",
		name: "Bill Gates",
		title: "Microsoft is great",
		bio: "I founded Microsoft and am very wealthy.",
		role: "CEO",
		lookingFor: ["CPO", "COO"],
		hasIdea: "true",
		sectors: ["B2B", "Hardware"],
		locations: ["London", "Stockholm", "Paris"],
		likes: ["steve.jobs@apple.com"]
	});
	db.insert("posts", {
		username: "steve.jobs@apple.com",
		name: "Steve Jobs",
		title: "It just works",
		bio: "I founded Apple and I'm also very wealthy.",
		role: "CEO",
		lookingFor: ["CTO"],
		hasIdea: "true",
		sectors: ["Hardware", "Consumer"],
		locations: ["Remote"],
		likes: ["jan@jan.com", "bill.gates@microsoft.com"]
	});

	// commit the database to localStorage
	// all create/drop/insert/update/delete operations should be committed
	db.commit();
}

export default db