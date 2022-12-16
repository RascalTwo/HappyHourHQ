import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import Header from "../components/Header";
import Footer from '../components/Footer';

function Login() {
	let navigate = useNavigate();

	const { handleLogin } = useAuth();

	const [msg, setMsg] = React.useState({
		text: '',
		success: false,
	});

	const [loginData, setLoginData] = React.useState({
		email: '',
		password: '',
	});

	function handleFormChange(event) {
		const { name, value, type, checked } = event.target;
		setLoginData(prevloginData => ({
			...prevloginData,
			[name]: type === 'checkbox' ? checked : value,
		}));
	}

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			const response = await axios({
				method: 'POST',
				data: {
					email: loginData.email,
					password: loginData.password,
				},
				url: '/login',
				withCredentials: true,
			});
			console.log('From Server:', response.data.user);
			setMsg({
				text: response.data.message.msgBody,
				success: true,
			});
			handleLogin(response.data.user);
			setTimeout(() => navigate('/dashboard'), 1500)
		} catch (err) {
			console.log(err);
			setMsg({
				text: err.response.data.message.msgBody,
				success: false,
			});
		}
	};

	return (
	
		<div className='flex flex-col min-h-screen bg-gray-800 md:bg-gray-200'>
			<Header />
			<div className='flex-grow'>
				<section className='flex flex-col items-center p-10 '>
					<div className=' rounded-2xl w-96 shadow-xl bg-gray-800'>
						<div className='flex flex-col p-8 space-y-2'>
							<h1 className='card-title self-center mb-4 text-white'>
								Welcome back!
							</h1>
							<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
								<input
									type='text'
									name='email'
									placeholder='Email'
									onChange={handleFormChange}
									className='input input-bordered w-full max-w-xs'
								/>
								<input
									type='password'
									name='password'
									placeholder='Password'
									onChange={handleFormChange}
									className='input input-bordered w-full max-w-xs'
								/>
								<div className='card-actions justify-center mt-4'>
									<button className='flex w-full items-center justify-center bg-green-400 px-4 py-2 w-2/5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-300'>Log in</button>
								</div>
							</form>
							<div
								className={
									msg.success
										? 'text-sky-400 text-center'
										: 'text-warning text-center'
								}
							>
								{msg ? msg.text : ''}
							</div>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</div>
	);
}

export default Login;
