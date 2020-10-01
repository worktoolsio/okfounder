import localStorageDB from "localstoragedb";
// Uses https://github.com/knadh/localStorageDB

// Initialise. If the database doesn't exist, it is created

////////////////////////////////////////////////
// Change the dbName if you change the schema or
// initial data to reset the db
const dbName = "userData_2";
/////////////////////////////////////////////////

var db = new localStorageDB(dbName, localStorage);

// if (!db.tableExists("users")) {
//   db.createTable("users", ["username", "name", "email", "company", "jobTitle"]);

//   db.insert("users", {
//     username: "test",
//     name: "nametest",
//     email: "emailaddress",
//     company: "sstacker",
//     jobTitle: "dev",
//   });

//   db.commit();
// }

export default db;
