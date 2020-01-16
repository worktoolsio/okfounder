import LocalStorageDB from 'localstoragedb'
// Uses https://github.com/knadh/localStorageDB

// Initialise. If the database doesn't exist, it is created

// //////////////////////////////////////////////
// Change the dbName if you change the schema or
// initial data to reset the db
const dbName = 'userData_2'
// ///////////////////////////////////////////////

const db = new LocalStorageDB(dbName, localStorage)

// Check if the database was just created. Useful for initial database setup
if (!db.tableExists('posts')) {
  // create the "posts" table
  db.createTable('posts', ['user', 'title', 'comments'])

  // insert some data
  db.insert('posts', {
    user: 'billgates',
    title: 'Microsoft is great',
    comments: [
      { user: 'stevejobs', title: 'The only problem with Microsoft is they just have no taste' },
      { user: 'billgates', title: 'huh nice!' }
    ]
  })
  db.insert('posts', {
    user: 'billgates',
    title: "It looks like you're writing a letter",
    comments: [
      { user: 'stevejobs', title: 'to who?' },
      { user: 'billgates', title: 'yeah cool!' }
    ]
  })
  db.insert('posts', { user: 'stevejobs', title: 'It just works' })

  // commit the database to localStorage
  // all create/drop/insert/update/delete operations should be committed
  db.commit()
}

export default db
