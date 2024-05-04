// App.js (или index.js)
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import RegistrationForm from './RegistrationForm';
import './App.css';

const App = () => {
  return (
      <ApolloProvider client={client}>
        <RegistrationForm />
      </ApolloProvider>
  );
};

export default App;
