import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import 'normalize.css';

const Heading = styled.h1`
    color: red;
`;

const App = () => <Heading>Pooh</Heading>;

ReactDOM.render(<App />, document.querySelector('.root'));
