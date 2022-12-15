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

							<div className='flex justify-center gap-16 my-6 text-white rounded bg-emerald-100 mx-24 p-2'>
								<div className='text-emerald-900 font-medium'>Color Test</div>
								<div className='p-2 rounded bg-emerald-500'>Color Test</div>
								<div className='text-emerald-300 font-medium'>Color Test</div>
								<div className='text-emerald-500 font-medium'>Color Test</div>
								<div className='text-emerald-500 font-bold bg-white p-2'>Color Test</div>
								<div className='text-emerald-700 font-bold bg-white p-2'>Color Test</div>
							</div>
							<div className='flex justify-center gap-16 my-6 text-white rounded mx-24 bg-sky-100 p-2'>
								<div className='text-sky-900 font-medium'>Color Test</div>
								<div className='p-2 rounded bg-sky-500'>Color Test</div>
								<div className='text-sky-300 font-medium'>Color Test</div>
								<div className='text-sky-500 font-medium'>Color Test</div>
								<div className='text-sky-500 font-bold bg-white p-2'>Color Test</div>
								<div className='text-sky-700 font-bold bg-white p-2'>Color Test</div>
							</div>
							<div className='flex justify-center gap-16 my-6 text-white rounded mx-24 bg-amber-100 p-2'>
								<div className='text-amber-900 font-medium'>Color Test</div>
								<div className='p-2 rounded bg-amber-500'>Color Test</div>
								<div className='text-amber-300 font-medium'>Color Test</div>
								<div className='text-amber-500 font-medium'>Color Test</div>
								<div className='text-amber-500 font-bold bg-white p-2'>Color Test</div>
								<div className='text-amber-700 font-bold bg-white p-2'>Color Test</div>
							</div>
							<div className='flex justify-center gap-16 my-6 text-white rounded mx-24 p-2 bg-slate-100'>
								<div className='text-slate-900 font-medium'>Color Test</div>
								<div className='p-2 rounded bg-slate-500'>Color Test</div>
								<div className='text-slate-300 font-medium'>Color Test</div>
								<div className='text-slate-500 font-medium'>Color Test</div>
								<div className='text-slate-500 font-bold bg-white p-2'>Color Test</div>
								<div className='text-slate-700 font-bold bg-white p-2'>Color Test</div>
							</div>
							<div className='flex justify-center gap-16 my-6 text-white rounded mx-24 p-2 bg-violet-100'>
								<div className='text-violet-900 font-medium'>Color Test</div>
								<div className='p-2 rounded bg-violet-500'>Color Test</div>
								<div className='text-violet-300 font-medium'>Color Test</div>
								<div className='text-violet-500 font-medium'>Color Test</div>
								<div className='text-violet-500 font-bold bg-white p-2'>Color Test</div>
								<div className='text-violet-700 font-bold bg-white p-2'>Color Test</div>
							</div>
							<div className='flex justify-center gap-16 my-6 text-white rounded mx-24 p-2 bg-indigo-100'>
								<div className='text-indigo-900 font-medium'>Color Test</div>
								<div className='p-2 rounded bg-indigo-500'>Color Test</div>
								<div className='text-indigo-300 font-medium'>Color Test</div>
								<div className='text-indigo-500 font-medium'>Color Test</div>
								<div className='text-indigo-500 font-bold bg-white p-2'>Color Test</div>
								<div className='text-indigo-700 font-bold bg-white p-2'>Color Test</div>
							</div>
							<div className='flex justify-center gap-16 my-6 text-white rounded mx-24 p-2 bg-teal-100'>
								<div className='text-teal-900 font-medium'>Color Test</div>
								<div className='p-2 rounded bg-teal-500'>Color Test</div>
								<div className='text-teal-300 font-medium'>Color Test</div>
								<div className='text-teal-500 font-medium'>Color Test</div>
								<div className='text-teal-500 font-bold bg-white p-2'>Color Test</div>
								<div className='text-teal-700 font-bold bg-white p-2'>Color Test</div>
							</div>
							<div className='flex justify-center gap-16 my-6 text-white rounded mx-24 p-2 bg-gray-100'>
								<div className='text-gray-900 font-medium'>Color Test</div>
								<div className='p-2 rounded bg-gray-500'>Color Test</div>
								<div className='text-gray-300 font-medium'>Color Test</div>
								<div className='text-gray-500 font-medium'>Color Test</div>
								<div className='text-gray-500 font-bold bg-white p-2'>Color Test</div>
								<div className='text-gray-700 font-bold bg-white p-2'>Color Test</div>
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
