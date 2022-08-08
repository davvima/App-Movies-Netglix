//React
import React from 'react';
import ReactDOM from 'react-dom/client';

//Redux 
import store from './redux/store'
import { Provider } from 'react-redux';


//Router-Dom
import { BrowserRouter } from "react-router-dom";

//Components
import App from 'App';

//Styles
import "css/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
