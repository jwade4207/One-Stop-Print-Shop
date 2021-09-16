import './App.css';
<<<<<<< HEAD
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState'
import { Nav } from 'react-bootstrap';
=======
>>>>>>> 3ac8433a0c6e12ab269548d375290ebfec8cd47e
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { StoreProvider } from './utils/GolbalState';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div>
        <StoreProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
<<<<<<< HEAD
            {/*<Route exact path="/orderHistory" component={OrderHistory} />*/}
            <Route exact path="/products/:id" component={Detail} />
=======
            <Route exact path="/orderHistory" component={OrderHistory} />
            <Route exact path="/banners/:id" component={Detail} />
>>>>>>> 3ac8433a0c6e12ab269548d375290ebfec8cd47e
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  </ApolloProvider>
  );
}

export default App;
