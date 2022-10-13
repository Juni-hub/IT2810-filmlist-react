import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client';
import {relayStylePagination} from "@apollo/client/utilities";
import Films from './components/Films';
import Navigation from './components/Navigation';
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import FilmItem from './components/FilmItem';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          films: relayStylePagination(),
        },
      },
    },
  }),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={ <Films /> } />
          <Route path="/:id" element={ <FilmItem /> } />
          <Route path="/" element={ <Navigation /> } />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
