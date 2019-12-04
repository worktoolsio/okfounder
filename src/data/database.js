import localStorageDB from "localstoragedb"
// Uses https://github.com/knadh/localStorageDB

const dbName = "stackerapp"

var db = new localStorageDB(dbName, localStorage);

if( !db.tableExists("founders")) {

	db.createTable("founders", ["user", "title", "skills"]);

	db.insert("founders", {
		user: "Bill Gates", 
		title: "Microsoft is great",
		skills: ["mongodb", "nodejs", "python"]
	});
	db.insert("founders", {
		user: "Linus Torvalds",
		title: "It looks like you're writing a letter",
		skills: ["javascript", "go"]
	});
	db.insert("founders", {
		user: "Steve Jobs",
		title: "It just works",
		skills: ["java"]
	});
	db.insert("founders", {
		user: "Another one",
		title: "Blablabla",
		skills: ["go"]
	});
	db.insert("founders", {
		user: "Person",
		title: "Lorem ipsum dolo",
		skills: ["nodejs", "express"]
	});

	db.commit();
}

export default db