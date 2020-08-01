import { createBrowserHistory } from 'history'; 

export default createBrowserHistory();


// Here we are creating a browser history object, something that keeps track of the 
// route that we are currently on, so that browser redirection can be performed more
// easily. We are then able to more easily perform programatic redirects more easily.
// Note that, by default the browser router we were using before has a history object,
// but we had to change that to a regular router and pass in an history object to it,
// so that we can access it and work with it