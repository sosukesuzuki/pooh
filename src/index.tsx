import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import 'normalize.css';
import WorkerProxy from './WorkerProxy';
import { workerContext } from './lib/contexts';

const Heading = styled.h1`
    color: red;
`;

const App = () => <Heading>Pooh</Heading>;

async function main(): Promise<void> {
    const proxy = await new (WorkerProxy as any)();
    ReactDOM.render(
        <workerContext.Provider value={proxy}>
            <App />
        </workerContext.Provider>,
        document.querySelector('.root'),
    );
}

main();
