import Link from 'next/link';
import { useSession } from 'next-auth/react';
import dbConnect from '@/lib/utils/dbConnect';
import Pet from 'models/Pet';

export default function Home({ pets }) {
	const { data: session } = useSession();
	return (
		<>
			<div>
				{session ? <h3>{session.user.userId}</h3> : <h3>not session</h3>}

				<Link href="/account">
					<a>로그인</a>
				</Link>
				<br />
				<Link href="/new">
					<button className="btn view">news</button>
				</Link>
			</div>
			{/* Create a card for each pet */}
			{pets.map((pet) => (
				<div key={pet._id}>
					<div className="card">
						<img src={pet.image_url} />
						<h5 className="pet-name">{pet.name}</h5>
						<div className="main-content">
							<p className="pet-name">{pet.name}</p>
							<p className="owner">Owner: {pet.owner_name}</p>

							{/* Extra Pet Info: Likes and Dislikes */}
							<div className="likes info">
								<p className="label">Likes</p>
								<ul>
									{pet.likes.map((data, index) => (
										<li key={index}>{data} </li>
									))}
								</ul>
							</div>
							<div className="dislikes info">
								<p className="label">Dislikes</p>
								<ul>
									{pet.dislikes.map((data, index) => (
										<li key={index}>{data} </li>
									))}
								</ul>
							</div>

							<div className="btn-container">
								<Link href="/[id]/edit" as={`/${pet._id}/edit`}>
									<button className="btn edit">Edit</button>
								</Link>
								<Link href="/[id]" as={`/${pet._id}`}>
									<button className="btn view">View</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
}

export const getServerSideProps = async (context) => {
	await dbConnect();

	const result = await Pet.find({});
	const pets = result.map((doc) => {
		const pet = doc.toObject();
		pet._id = pet._id.toString();
		return pet;
	});

	return {
		props: { pets },
	};
};
