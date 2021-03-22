import React from 'react';
import ReactDOM from 'react-dom';
import { Reset } from 'styled-reset';
import{ AppPage } from './components/AppPage/AppPage';


ReactDOM.render(
  
    <>
      <Reset />
      <AppPage />
    </>
  ,
  document.getElementById('root')
);
