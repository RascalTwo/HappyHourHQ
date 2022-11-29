

export default function Footer() {
	return (
		<div className="flex flex-col">
        <footer className="p-4 bg-base-300 rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
            <div className="sm:flex sm:items-center sm:justify-between">
                {/* <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-8" alt="Flowbite Logo" /> */}
                    <span className="self-center text-base font-semibold whitespace-nowrap dark:text-white">Happy Hour HQ</span>
                {/* </a> */}
                <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="/" className="hover:underline">Happy Hour HQ</a>. All Rights Reserved.
            </span>
        </footer>
        </div>
	);
}