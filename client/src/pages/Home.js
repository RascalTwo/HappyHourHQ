import React from 'react';
import Header from '../components/Header';
import useAuth from '../auth/useAuth';
import Footer from '../components/Footer';

function Home() {
	const { authed } = useAuth();

	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='flex-grow'>
				<div className='flex flex-col p-10 items-center gap-5'>
					<h2>This is the home page.(Public)</h2>
					<div className='flex flex-col md:flex-row gap-10 justify-center'>
						
						{authed && 'You are logged in.'}
						
						
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
