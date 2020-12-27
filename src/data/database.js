import localStorageDB from "localstoragedb";
// Uses https://github.com/knadh/localStorageDB

// Initialise. If the database doesn't exist, it is created

////////////////////////////////////////////////
// Change the dbName if you change the schema or
// initial data to reset the db
const dbName = "userData_7";
/////////////////////////////////////////////////

var db = new localStorageDB(dbName, localStorage);

// Check if the database was just created. Useful for initial database setup
if (!db.tableExists("users")) {
  // create the "posts" table
  db.createTable("users", ["username", "bio", "contact", "skills"]);

  // insert some data
  db.insert("users", {
    username: "kristofkovacs",
    bio: "I'm a really great guy, and I'm really innovative",
    contact: "kristof@kovacsegri.com",
    skills: ["programming", "administrative"],
  });
  db.insert("users", {
    username: "billgates",
    bio:
      "Ex-Microsoft CEO. Looking for a great designer to join Melinda and myself in the board of the foundation.",
    contact: "contact@gates.com",
    skills: ["programming", "communication"],
  });
  db.insert("users", {
    username: "jonyive",
    bio:
      "MiniAluminiumalism is the future. Just quit Apple, looking for a new venture.",
    contact: "jony@email.com",
    skills: ["UX/UI", "design"],
  });
  db.insert("users", {
    username: "simonsinek",
    bio: "Always start with the why.",
    contact: "simon@sinek.com",
    skills: ["marketing", "sales", "communication"],
  });
  // commit the database to localStorage
  // all create/drop/insert/update/delete operations should be committed
  db.commit();
}

if (!db.tableExists("matches")) {
  db.createTable("matches", ["from", "to", "status"]);

  db.commit();
}

export default db;
