import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import{ AppPage } from './components/AppPage/AppPage';
import { FrontPage } from './components/FrontPage/FrontPage';


const Wrapper = styled.div`
    flex: 1;
`;

ReactDOM.render(
  
    <Wrapper>
      <Reset />
      <FrontPage />
    </Wrapper>
  ,
  document.getElementById('root')
);
