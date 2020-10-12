import localStorageDB from "localstoragedb";
// Uses https://github.com/knadh/localStorageDB

// Initialise. If the database doesn't exist, it is created

////////////////////////////////////////////////
// Change the dbName if you change the schema or
// initial data to reset the db
const dbName = "userDatabase";
/////////////////////////////////////////////////

var db = new localStorageDB(dbName, localStorage);

// Check if the database was just created. Useful for initial database setup

const addFounder = (
  username,
  firstName,
  lastName,
  location,
  introduction,
  contact,
  skills,
  cofounderSkills
) =>
  db.insert("founders", {
    username,
    firstName,
    lastName,
    location,
    introduction,
    contact,
    skills,
    cofounderSkills,
  });

if (!db.tableExists("matches")) {
  db.createTable("matches", ["username", "invitedUsername", "status"]);
}

if (!db.tableExists("founders")) {
  db.createTable("founders", [
    "username",
    "firstName",
    "lastName",
    "location",
    "introduction",
    "contact",
    "skills",
    "cofounderSkills",
  ]);

  addFounder(
    "jmar",
    "Jim",
    "Marino",
    "Washington",
    "Co-founder of Tuft & Needle (T&N) and Chief Strategy Officer of Serta Simmons Bedding, Jim Marino is a passionate storyteller, facilitator and teacher, inspiring T&N's most challenging and disruptive projects. Pioneering the disruption of the mattress industry space from brick and mortar to e-commerce, JT is now leading the charge in reinventing retail as we know it to create a true omni-channel “clicks to bricks” experience for consumers. The brand is widely known for iterating, and JT is at the helm of this retail evolution.",
    "twitter: @jmar",
    [
      { name: "Marketing", rank: 2 },
      { name: "Leadership", rank: 4 },
      { name: "Fundraising", rank: 2 },
      { name: "Engineering", rank: 5 },
      { name: "Sales", rank: 2 },
    ],
    [
      { name: "Marketing", rank: 5 },
      { name: "Leadership", rank: 2 },
      { name: "Fundraising", rank: 1 },
      { name: "Engineering", rank: 5 },
      { name: "Sales", rank: 5 },
    ]
  );
  addFounder(
    "jrob",
    "John",
    "Robertson",
    "LA",
    "John is also the Co-Founder and Vice-Chairman of Human Longevity Inc. (HLI), a genomics and cell therapy-based diagnostic and therapeutic company focused on extending the healthy human lifespan.  He is also the Co-Founder and Executive Chairman of Singularity University, a graduate-level Silicon Valley institution that studies exponentially growing technologies, their ability to transform industries and solve humanity’s grand challenges.",
    "twitter: @jrob",
    [
      { name: "Marketing", rank: 5 },
      { name: "Leadership", rank: 2 },
      { name: "Fundraising", rank: 1 },
      { name: "Engineering", rank: 5 },
      { name: "Sales", rank: 5 },
    ],
    [
      { name: "Marketing", rank: 5 },
      { name: "Leadership", rank: 2 },
      { name: "Fundraising", rank: 1 },
      { name: "Engineering", rank: 5 },
      { name: "Sales", rank: 5 },
    ]
  );
  addFounder(
    "daep",
    "Daehee",
    "Park",
    "New York",
    "Daehee Park is the co-founder of Tuft & Needle (T&N), a digitally-native sleep brand that offers high quality products for the bedroom at a fair price while providing an award-winning customer experience. There, he leads business and marketing strategy and has been instrumental in redefining the sleep industry and retail experience through the businesses’ rapid nationwide retail expansion, award-winning company culture, evolving product offering and acclaimed advertising campaigns.",
    "twitter: @daep",
    [
      { name: "Marketing", rank: 1 },
      { name: "Leadership", rank: 1 },
      { name: "Fundraising", rank: 5 },
      { name: "Engineering", rank: 5 },
      { name: "Sales", rank: 2 },
    ],
    [
      { name: "Marketing", rank: 5 },
      { name: "Leadership", rank: 1 },
      { name: "Fundraising", rank: 4 },
      { name: "Engineering", rank: 1 },
      { name: "Sales", rank: 3 },
    ]
  );

  // commit the database to localStorage
  // all create/drop/insert/update/delete operations should be committed
  db.commit();
}

export default db;
