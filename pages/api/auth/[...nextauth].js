import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
	// 로그인 인증 방식 설정하기
	providers: [
		// 이메일과 패스워드 입력으로 인증하겠다.
		CredentialsProvider({
			// 해당 인증 방식의 이름은 " " 이다.
			id: 'email-password-credential',
			name: 'Credentials',
			type: 'credentials',
			// nextAuth에서 자동으로 Form을 만들어주는데
			// 해당 Form에 들어갈 내용을 입력한다. (이따가 화면을 보면 이해된다.)
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'test@test.com' },
				password: { label: 'Password', type: 'password' },
			},
			// Sign up 버튼을 누르면 들어오는 함수
			// 해당 부분에서 들어온 데이터를 가지고 인증을 진행하면 된다.
			// (지금은 무조건 인증되는 방식으로 처리되어있음)
			async authorize(credentials, req) {
				const email = credentials.email;
				const password = credentials.password;
				if (email === 'tester1230@daum.net' && password === '123123') {
					return credentials;
				} else {
					throw new Error('아이디 혹은 패스워드가 틀립니다.');
				}
			},
		}),
	],
	pages: {
		signIn: '/account/login',
	},
	secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
	jwt: {
		// A secret to use for key generation. Defaults to the top-level `secret`.
		secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
		// The maximum age of the NextAuth.js issued JWT in seconds.
		// Defaults to `session.maxAge`.
		maxAge: 61,
	},
	session: {
		// Choose how you want to save the user session.
		// The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
		// If you use an `adapter` however, we default it to `"database"` instead.
		// You can still force a JWT session by explicitly defining `"jwt"`.
		// When using `"database"`, the session cookie will only contain a `sessionToken` value,
		// which is used to look up the session in the database.
		strategy: 'jwt',

		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 61, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60, // 24 hours
	},
	//아래 부분 추가.
	callbacks: {
		async jwt({ token, account }) {
			console.log('callbacks jwt');
			console.log(token);
			return token;
		},
		async session({ session, token, user }) {
			console.log('callbacks session');
			console.log(session);
			return session;
		},
	},
});
