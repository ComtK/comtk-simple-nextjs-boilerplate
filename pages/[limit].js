import React from 'react';
import useReqeust from '@/lib/utils/useRequest';

const Movies = ({ limit }) => {
	const { data, error } = useReqeust({
		url: `/api/movies/${limit}`,
		method: 'GET',
	});

	if (error) {
		return <div>Error...</div>;
	}

	if (!data) {
		return <div>Loading</div>;
	}

	return (
		<div>
			<h1>Top {limit} Movies of All Time</h1>
			<p>
				<small>(According to Metacritic)</small>
			</p>
			<ul>
				{data.map((movie, key) => (
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

Movies.getInitialProps = async ({ req, res, query: { limit } }) => {
	return { limit };
};

export default Movies;
