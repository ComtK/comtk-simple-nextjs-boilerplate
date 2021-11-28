import React from 'react';
import { connectToDatabase } from '../lib/mongodb';

const Movies = ({ movies }) => {
	return (
		<div>
			<h1>Top 20 Movies of All Time</h1>
			<p>
				<small>(According to Metacritic)</small>
			</p>
			<ul>
				{movies.map((movie, key) => (
					<li key={key}>
						<h2>{movie.title}</h2>
						<h3>{movie.metacritic}</h3>
						<p>{movie.plot}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Movies;

export const getServerSideProps = async () => {
	const { db } = await connectToDatabase();

	const movies = await db.collection('movies').find({}).sort({ metacritic: -1 }).limit(20).toArray();

	return {
		props: {
			movies: JSON.parse(JSON.stringify(movies)),
		},
	};
};
