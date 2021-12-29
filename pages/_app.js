import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider
			session={session}
			options={{
				clientMaxAge: 60, // Re-fetch session if cache is older than 60 seconds
				keepAlive: 5 * 60, // Send keepAlive message every 5 minutes
			}}
		>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
