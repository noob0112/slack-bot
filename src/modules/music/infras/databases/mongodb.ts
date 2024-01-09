import * as mongoDB from "mongodb";

// export const collections: { musics?: mongoDB.Collection<Game> } = {};

export async function connectToDatabase() {
    // Create a new MongoDB client with the connection string from .env
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING || '');

    // Connect to the cluster
    await client.connect();

    // Connect to the database with the name specified in .env
    const db = client.db(process.env.DB_NAME);

    // Apply schema validation to the collection
    // await applySchemaValidation(db);

    // Connect to the collection with the specific name from .env, found in the database previously specified
    // const gamesCollection = db.collection<Game>(process.env.GAMES_COLLECTION_NAME);

    // Persist the connection to the Games collection
    // collections.musics = gamesCollection;

    console.log(
        // `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`,
    );
}