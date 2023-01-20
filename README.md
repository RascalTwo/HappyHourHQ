# Happy Hour HQ

Web Application allowing you to find, favorite, review and add local happy hours near you.

**Link to project:** <a href="https://happyhourhq.onrender.com">Happy Hour HQ</a>

<!-- ![A screenshot of the app](https://drive.google.com/file/d/1-2_qh0nSB2_kS1qBRbo0eHqOYeL-L2Kv/view?usp=sharing)  -->

## How It's Made:

### Tech used:
**HTML, CSS, JavaScript, React, Node, Express, MongoDB, TailwindCSS**

### Front-End
The front-end for this app was built using React and Tailwindcss along with DaisyUi and HeadlessUI. The React authentication method revolves around the RequireAuth and useAuth components. useAuth uses react context to extend the auth state to any component under the AuthProvider. The RequireAuth component provides a way to check for authentication on specific routes, such as the Dashboard.

### Back-End
The back-end for this app was built using Node, Express, Mongoose, and MongoDB along with Passport-local, Express-session, and Bcrpyt for authentication. The backend is based off of an MVC architecture with the views being in the client folder. The routes and controller handle login, logout, signup, and authenticated to check if the current user has an authenticated session stored.  

## Optimizations
- [X] Filters for sorting through the main feed
- [] Improved responsiveness and mobile friendly
- [] Incorporation of Google Maps
- [] Reorganization of React components for more reusability

## Lessons Learned:
I have really become familar with MVC architecture and navigating the backend. I have also learned that there are so many ways to authenticate your applications and they all have their pros and cons. It was a challenge to get everything working properly, and planning on adding more methods soon (such as Google). 

Also noticed that my virtual computer was corrupting my .git files occasionally. Requiring me to force push, deleting previous commits unfortunately. Tried creating new branches, pull requests, etc. Looking forward to fixing the underlying issue or figuring out how to properly fix the corrupted file. For now got gitbash running on my desktop computer.

React is a fantastic language, along with TailwindCSS for styling. Learned a great deal about useEffects, hooks, fetching data, using / setting state in React. 

- - - -

## Other Work:
Take a look at some other projects I have.

**Portfolio:** [Live Site](carrib.netlify.app/) | [Repo](https://github.com/BCarrico/portfolio)

**Badger Brewery:** [Live Site](https://badgerbrewery.netlify.app/) | [Repo](https://github.com/BCarrico/BadgerBrewery)
