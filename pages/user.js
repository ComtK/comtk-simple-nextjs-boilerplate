import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/client';

const user = () => {
	const { session } = useSession();
	return <div>user page / {session}</div>;
};

export default user;
