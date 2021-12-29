import { connectToDatabase } from '../lib/mongodb';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Home({ isConnected }) {
	const { data: session } = useSession();
	return (
		<div>
			{isConnected ? (
				<h2 className="subtitle">You are connected to MongoDB</h2>
			) : (
				<h2 className="subtitle">
					You are NOT connected to MongoDB. Check the <code>README.md</code> for instructions.
				</h2>
			)}

			{session ? <h3>{session.user.userId}</h3> : <h3>not session</h3>}

			<Link href="/account">
				<a>로그인</a>
			</Link>
			<br />

			<Link href="/[limit]" as="/3">
				<a>limit 3</a>
			</Link>
			<br />

			<Link href="/[limit]" as="/5">
				<a>limit 5</a>
			</Link>
		</div>
	);
}

export const getServerSideProps = async (context) => {
	const { client } = await connectToDatabase();
	// client.db() will be the default database passed in the MONGODB_URI
	// You can change the database by calling the client.db() function and specifying a database like:
	// const db = client.db("myDatabase");
	// Then you can execute queries against your database like so:
	// db.find({}) or any of the MongoDB Node Driver commands

	const isConnected = client.topology.s.state === 'connected';

	return {
		props: { isConnected },
	};
};
