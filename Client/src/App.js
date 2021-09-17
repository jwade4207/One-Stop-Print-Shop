import React from 'react';

import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import './App.css';

import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

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
            <Route exact path="/banners/:id" component={Detail} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  </ApolloProvider>
  );
}

export default App;
