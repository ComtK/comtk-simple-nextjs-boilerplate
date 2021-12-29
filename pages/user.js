import React from 'react';
import { useSession } from 'next-auth/react';

const user = () => {
	const { data: session } = useSession();
	console.log(session);
	return <div>{session?.user.email} page</div>;
};

export default user;
