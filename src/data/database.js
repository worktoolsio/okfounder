import localStorageDB from "localstoragedb";
// Uses https://github.com/knadh/localStorageDB

// Initialise. If the database doesn't exist, it is created

////////////////////////////////////////////////
// Change the dbName if you change the schema or
// initial data to reset the db
const dbName = "userData_2";
/////////////////////////////////////////////////

var db = new localStorageDB(dbName, localStorage);

// initialise users table with founders
if (!db.tableExists("users")) {
  db.createTable("users", [
    "username",
    "name",
    "email",
    "company",
    "jobTitle",
    "connections",
  ]);

  db.insert("users", {
    username: "sam",
    name: "Sam Davyson",
    email: "sam@stacker.app",
    company: "Stacker",
    jobTitle: "Founder",
    connections: [],
  });

  db.insert("users", {
    username: "michael",
    name: "Michael Skelly",
    email: "michael@stacker.app",
    company: "Stacker",
    jobTitle: "Founder",
    connections: [],
  });

  db.insert("users", {
    username: "charlotte",
    name: "Charlotte Bone",
    email: "charlotte@stacker.app",
    company: "Stacker",
    jobTitle: "Founder",
    connections: [],
  });

  db.commit();
}

export default db;
