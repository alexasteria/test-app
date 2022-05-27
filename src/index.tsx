import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
    uri: 'https://spacexdata.herokuapp.com/graphql',
    cache: new InMemoryCache(),
    // headers: {
    //     'Authorization': `Bearer ${token}`,
    // },
    //http://152.228.215.94:81/api - ругается на cors
});

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
