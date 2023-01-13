
import useAuth from '../auth/useAuth';
import Logo from '../images/logo.png';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  ListBulletIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom';

const solutions = [
  {
    name: 'Favorites',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '/dashboard',
    icon: ChartBarIcon,
  },
  {
    name: 'Happy Hours',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: "/feed",
    icon: CursorArrowRaysIcon,
  },
  { name: 'Add Location', description: "Your customers' data will be safe and secure.", href: '/addHappyHour', icon: ShieldCheckIcon },
]

export default function Header() {
	const { authed, handleLogout } = useAuth();
  const location = useLocation();
  console.log(location.pathname, (location.pathname == '/feed'))
	return (
		<div>
{/* HEADER WITHOUT AUTHENTICATION */}

					{!authed && (
            <div className="relative bg-gray-800">
						<Popover className="relative z-20 bg-gray-800">
              <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                  <div className="flex justify-start lg:w-0 lg:flex-1">
                    <Link to="/">
                      <span className="sr-only">Your Company</span>
                      <img
                        className="h-8 w-auto sm:h-10"
                        src={Logo}
                        alt=""
                      />
                    </Link>
                    <Link to="/"><span className='h-8 w-auto sm:h-10 flex items-center pl-2 text-base font-medium text-white sm:justify-center'>Happy Hour HQ</span></Link>
                  </div>
                  <div className="-my-2 -mr-2 md:hidden">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-700 p-1 sm:p-2 md:p-2 text-gray-200 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400">
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                  <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                    
                    <Link to="/feed" className="text-base font-medium text-gray-200 hover:text-gray-900">
                      Happy Hours
                    </Link>
                    
                  </Popover.Group>
                  <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                    <Link to="/login"className="whitespace-nowrap text-base font-medium text-white hover:text-gray-900">
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="ml-8 inline-flex items-center justify-center whitespace-nowrap bg-green-400 px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-200"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
        
              <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                  <div className="divide-y-2 divide-gray-500 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-5 pt-5 pb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Link to="/">
                            <img
                              className="h-8 w-auto"
                              src={Logo}
                              alt="Your Company"
                            />
                          </Link>
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-700 p-1 sm:p-2 md:p-2 text-gray-200 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400">
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <nav className="grid gap-y-8">
                            <Link to="/feed" className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                              <ListBulletIcon className="h-6 w-6 flex-shrink-0 text-sky-400" aria-hidden="true" />
                              <span className="ml-3 text-base font-medium text-gray-300">Happy Hours</span>
                            </Link>
                        </nav>
                      </div>
                    </div>
                    <div className="space-y-6 py-6 px-5">
                      
                      <div>
                        <Link to='/signup'
                          
                          className="flex w-full items-center justify-center bg-green-400 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-300"
                        >
                          Sign up
                        </Link>
                        <p className="mt-6 text-center text-base font-medium text-gray-400">
                          Already have an account? {' '}
                          <Link to="/login" className="text-sky-400 hover:text-gray-200">
                            Sign in
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
					)}
					
{/* HEADER WITH AUTHENTICATION */}
                    
                    {authed && (
						<Popover className="relative bg-gray-800 z-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6">
                          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
                            <div className="flex justify-start lg:w-0 lg:flex-1">
                      
                                <Link to="/">
                                <span className="sr-only">Your Company</span>
                                <img
                                  className="h-8 w-auto sm:h-10"
                                  src={Logo}
                                  alt=""
                                />
                                </Link>
                           
                              <Link to="/"><span className='h-8 w-auto sm:h-10 flex items-center pl-2 text-white font-medium text-white sm:ustify-center'>Happy Hour HQ</span></Link>
                            </div>
                            <div className="-my-2 -mr-2 md:hidden">
                              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-700 p-1 sm:p-2 md:p-2 text-gray-200 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400">
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                              </Popover.Button>
                            </div>
                            <Popover.Group as="nav" className="hidden space-x-10 md:flex">

                  
                              {location.pathname === '/dashboard' ? <Link to="/dashboard" className="text-base font-medium text-gray-200 p-1 px-4 rounded rounded border-2 border-green-400 hover:text-gray-900">Favorites</Link> : <Link to="/dashboard" className="text-base font-medium text-gray-200 hover:text-gray-900">Favorites</Link>}
                              
                              {location.pathname === '/feed' ? <Link to="/feed" className="text-base font-medium text-gray-200 p-1 px-4 rounded border-2 border-green-400 hover:text-gray-900">Happy Hours</Link> : <Link to="/feed" className="text-base font-medium text-gray-200 hover:text-gray-900">Happy Hours</Link>}
                              
                              {location.pathname === '/addhappyhour' ? <Link to="/addhappyhour" className="text-base font-medium text-gray-200 p-1 px-4 rounded border-2 border-green-400 rounded hover:text-gray-900">Add Location</Link> : <Link to="/addhappyhour" className="text-base font-medium text-gray-200 hover:text-gray-900">Add Location</Link>}
                  

                            </Popover.Group>
                            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">

                              <button onClick={handleLogout}
                                
                                className="ml-8 inline-flex items-center justify-center whitespace-nowrap bg-green-400 px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-300"
                              >
                                Sign Out
                              </button>
                            </div>
                          </div>
                        </div>
                  
                        <Transition
                          as={Fragment}
                          enter="duration-200 ease-out"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="duration-100 ease-in"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
                            <div className="divide-y-2 divide-gray-200 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="px-5 pt-5 pb-6">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <Link to='/'>
                                    <img
                                      className="h-8 w-auto"
                                      src={Logo}
                                      alt="Your Company"
                                    />
                                    </Link>
                                  </div>
                                  <div className="-mr-2">
                                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-700 p-1 sm:p-2 md:p-2 text-gray-200 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400">
                                      <span className="sr-only">Close menu</span>
                                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                  </div>
                                </div>
                                <div className="mt-6">
                                  <nav className="grid gap-y-8">
                                    {solutions.map((item) => (
                                      <a
                                        key={item.name}
                                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-600"
                                      >
                                        <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                                        <Link to={item.href}><span className="ml-3 text-base font-medium text-gray-200">{item.name}</span></Link>
                                      </a>
                                    ))}
                                  </nav>
                                </div>
                              </div>
                              <div className="space-y-6 py-6 px-5">

                                <div>
                                  <button type="button" onClick={handleLogout}
                                    className="flex w-full items-center justify-center bg-green-400 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-300"
                                  >
                                    Sign Out
                                  </button>

                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
					)}
	</div>
	);

}
