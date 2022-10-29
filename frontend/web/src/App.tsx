import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { PageHeader, Typography  } from 'antd';
import { ApolloClient, ApolloProvider, InMemoryCache, } from '@apollo/client';
import Films from './components/Films';
import { Provider } from "react-redux";
import {relayStylePagination} from "@apollo/client/utilities";
import store from "./redux/store";

const { Paragraph } = Typography;

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
          <PageHeader
            className="site-page-header m-4"
            title="The film database"
          >
            <>
            <Paragraph
            style={{fontSize: 18}}>
              This database shows a selection of films from 1900-2018. 
              Each film is described with its title, release year, cast and genres.
              You are able to filter the films based on title, year and genre,
              as well as sort the selection based on ascending or descending release years.
              You are also able to add a new film into the database.
            </Paragraph>
            </>
          </PageHeader>
          <Routes>
            <Route path="/" element={ <Films /> } />
          </Routes>
        </Router>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
