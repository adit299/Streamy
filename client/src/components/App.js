import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// Using the link component for navigation within our application
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

// const PageOne = () => {
//     return ( 
//         <div>
//             PageOne
//             <Link to="/pagetwo">Navigate to Page Two</Link>
//         </div>
//     );
// };

// const PageTwo = () => {
//     return ( 
//         <div>
//             PageTwo
//             <Link to="/">Navigate to Page One</Link>
//         </div>
//     );
// };

const App = () => {
    return (
        <div>
            {/* Our header element has to encompassed in the Browser Router, since 
            links cannot be defined outside of a router */}
            <Router history={history}>
                <div>
                    {/* These are examples of creating routes using react-router-dom */}
                    {/* So note that the exact keyword ensures that only the exact route
                    is matched, ensuring that multiple routes are not matched */}
                    {/* ex. without the exact keyword for the first path, when we go to 
                    the route /pagetwo, both the / and pagetwo would be matched, rendering
                    both of those elements on screen */}
                    {/* <Route path="/" exact component={PageOne}/>
                    <Route path="/pagetwo" exact component={PageTwo}/> */}
                    <Header />
                    {/* The Switch function from react-router-dom ensures that only
                    one of the routes are matched, and the order of the routes listed dictates
                    which router will be used as the match */}
                    <Switch>
                        <Route path='/' exact component={StreamList} />
                        <Route path='/streams/new' exact component={StreamCreate} />
                        <Route path='/streams/edit/:id' exact component={StreamEdit} />
                        <Route path='/streams/delete/:id' exact component={StreamDelete} />
                        <Route path='/streams/:id' exact component={StreamShow} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;









