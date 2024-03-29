import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

const uri = process.env.MONGODB_URI;
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

let cachedClient;
let cachedDb;

dotenv.config({ path: '.env.local' });

if (!process.env.MONGODB_URI) {
	throw new Error('Please add your Mongo URI to .env.local');
}

export const connectToDatabase = async () => {
	const uri = process.env.MONGODB_URI;

	// check the cached.
	if (cachedClient && cachedDb) {
		// load from cache
		return {
			client: cachedClient,
			db: cachedDb,
		};
	}

	// Connect to cluster
	let client = new MongoClient(uri, options);
	await client.connect();
	let db = client.db(process.env.MONGODB_DB);

	cachedClient = client;
	cachedDb = db;

	return {
		client: cachedClient,
		db: cachedDb,
	};
};

const ncDatabase = async (req, res, next) => {
	if (!(cachedClient && cachedDb)) {
		const connectObj = await connectToDatabase();
		req.dbClient = connectObj.client;
		req.db = connectObj.db;
	} else {
		req.dbClient = cachedClient;
		req.db = cachedDb;
	}
	return next();
};

export default ncDatabase;
