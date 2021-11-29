import { connectToDatabase } from '../../../lib/mongodb';

// import { connectToDatabase } from '@/lib/mongodb';

export default async (req, res) => {
	setTimeout(async () => {
		const limit = req.params.limit ? Number(req.params.limit) : 20;
		const { db } = await connectToDatabase();
		const movies = await db.collection('movies').find({}).sort({ metacritic: -1 }).limit(limit).toArray();
		if (movies.longth < 1) {
			res.send('Not Found!');
		} else {
			res.send(movies);
		}
	}, 1000);
};
