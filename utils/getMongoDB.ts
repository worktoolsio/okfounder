import { MongoClient, Db } from 'mongodb';

let cachedDb: Db;
let mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER_URL}`;
if (process.env.MONGO_DEV_SERVER_URL) {
  mongoURI = process.env.MONGO_DEV_SERVER_URL;
}

export const getMongoDB = async (): Promise<Db> => {
  /**
   * If a previous call to getMongoDB returned a database,
   * use the cached connection
   */
  if (cachedDb) {
    return cachedDb;
  }

  /**
   * If no connection is cached, create a new one
   */
  const client: MongoClient = await MongoClient.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (!client) {
    throw {
      code: 500,
      message: 'Datbase connection error.',
    };
  }

  // Select the database through the connection,
  // using the database path of the connection string
  const db = client.db(process.env.MONGO_DB_NAME);

  if (!db) {
    throw {
      code: 500,
      message: 'Cannot find database.',
    };
  }

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
};
