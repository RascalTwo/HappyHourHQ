import React from 'react';
import Header from '../components/Header';

import useAuth from '../auth/useAuth';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


function Home() {
	const { authed } = useAuth();

	return (
		
		<div className='flex flex-col min-h-screen bg-gray-200'>
			<Header />
			<div className='flex-grow'>
				
				<div className=" z-20 my-24 flex items-center bg-gray-200 dark:bg-gray-800">
					<div className="container  flex flex-col items-center justify-between px-6 py-8 mx-auto">
						<div className="flex flex-col">
							<h1 className="w-full text-4xl font-light text-center text-gray-800 uppercase sm:text-5xl dark:text-white">
								The Website To Find Happy Hours Near You!
							</h1>
							<h2 className="w-full max-w-2xl py-8 mx-auto text-xl font-light text-center text-gray-500 dark:text-white">
								Something goes here about how awesome happy hours are and catch the user
							</h2>
							<div className="flex items-center justify-center mt-4">
								<Link to ={`/signup`} className="px-4 py-2 mr-4 text-white uppercase bg-gray-800 border-2 border-transparent text-md hover:bg-gray-900">
									Get Started
								</Link>
								<Link to ={`/login`} className="px-4 py-2 text-gray-800 uppercase bg-transparent border-2 border-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md">
									Login Here
								</Link>
								
							</div>
						</div>
					</div>
				</div>

			</div>
			
			<Footer />
		</div>
	);
}

export default Home;
