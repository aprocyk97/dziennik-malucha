import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Reset } from 'styled-reset';
import{ AppPage } from './components/AppPage/AppPage';



const Wrapper = styled.div`
    flex: 1;
`;

ReactDOM.render(
  
    <Wrapper>
      <Reset />
      <AppPage />
    </Wrapper>
  ,
  document.getElementById('root')
);
