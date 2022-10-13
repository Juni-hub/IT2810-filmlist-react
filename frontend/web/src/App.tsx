import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Films from './components/Films';
import Navigation from './components/Navigation';
import { HashRouter, Route, Routes } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache(),
})

function App() {
  return (
  
    <ApolloProvider client={client}>
      <div className='container'>
        <Navigation />
      </div>
    </ApolloProvider>
  );
}

export default App;
