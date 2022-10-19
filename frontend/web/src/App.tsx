import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client';
import {relayStylePagination} from "@apollo/client/utilities";
import Films from './components/Films';
import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { PageHeader } from 'antd';

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
        <PageHeader
          className="site-page-header m-4"
          title="Film database"
          subTitle="This database shows films from 1900-2000"
        />
        <Routes>
          <Route path="/" element={ <Films /> } />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
