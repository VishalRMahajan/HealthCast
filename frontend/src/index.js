import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './input.css';
import App from './App';
import { UserProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

