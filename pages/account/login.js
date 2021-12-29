import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {
	const router = useRouter();

	const login = async (e) => {
		// 원래 실행되는 이벤트 취소
		e.preventDefault();
		// Form 안에서 이메일, 패스워드 가져오기
		const email = e.target.email.value;
		const password = e.target.password.value;
		const response = await signIn('email-password-credential', {
			email,
			password,
			redirect: false,
			callbackUrl: 'http://localhost:3000/user',
		});
		console.log(response);
		console.log(response.url);

		await router.push(response.url);
	};

	return (
		// onSubmit에 login 함수 등록
		// 로그인 버튼을 클릭하면 login 함수가 실행된다.
		<form onSubmit={login}>
			<label>
				이메일 :
				<input type="email" name="email" placeholder="test@test.com" />
			</label>
			<label>
				비밀번호 :
				<input type="password" name="password" />
			</label>
			<button type="submit">로그인</button>
		</form>
	);
};

export default Login;
