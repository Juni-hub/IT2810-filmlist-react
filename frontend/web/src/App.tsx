import 'antd/dist/antd.css';
import './App.css';

import { ApolloClient, ApolloProvider, InMemoryCache, } from '@apollo/client';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';

import FilmItem from './components/FilmItem';
import Films from './components/Films';
import {Provider} from "react-redux";
import React from 'react';
import {relayStylePagination} from "@apollo/client/utilities";
import store from "./redux/store";

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
    <Provider store = {store}>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={ <Films /> } />
          <Route path="/:id" element={ <FilmItem /> } />
        </Routes>
      </Router>
    </ApolloProvider>
    </Provider>
  );
}

export default App;
