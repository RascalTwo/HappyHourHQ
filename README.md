# Happy Hour HQ

A template to use for full-stack MERN apps with authentication and MVC backend organization.

**Link to project:** (No live site yet)

<!-- ![A screenshot of the app](https://drive.google.com/file/d/1-2_qh0nSB2_kS1qBRbo0eHqOYeL-L2Kv/view?usp=sharing)  -->

## How It's Made:

### Tech used:
**HTML, CSS, JavaScript, React, Node, Express, TailwindCSS**

### Front-End
The front-end for this app was built using React and Tailwindcss along with Axios, React-router-dom, and DaisyUi (a Tailwindcss component library). The React authentication method revolves around the RequireAuth and useAuth components. useAuth uses react context to extend the auth state to any component under the AuthProvider. The RequireAuth component provides a way to check for authentication on specific routes, such as the Dashboard.

### Back-End
The back-end for this app was built using Node, Express, Mongoose, and MongoDB along with Passport-local, Express-session, and Bcrpyt for authentication. The backend is based off of an MVC architecture with the views being in the client folder. The routes and controller handle login, logout, signup, and authenticated to check if the current user has an authenticated session stored.  

## Optimizations


## Lessons Learned:
I have really become familar with MVC architecture and navigating the backend. I have also learned that there are so many ways to authenticate your applications and they all have their pros and cons. It was a challenge to try to keep the authentication simple while still being secure.

- - - -

## Other Work:
Take a look at some other projects I have.

**Portfolio:** [Live Site](carrib.netlify.app/) | [Repo](https://github.com/BCarrico/portfolio)

**Badger Brewery:** [Live Site](https://badgerbrewery.netlify.app/) | [Repo](https://github.com/BCarrico/BadgerBrewery)