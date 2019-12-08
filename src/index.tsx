import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import WorkerProxy from './WorkerProxy';
import { workerContext, useWorkerContext } from './lib/contexts';

const App = () => {
    const WorkerAPI = useWorkerContext();
    return (
        <div>
            <h1>Pooh</h1>
            <button
                onClick={async () => {
                    await WorkerAPI.addFile();
                    const files = await WorkerAPI.getFiles();
                    console.log(files);
                }}
            >
                Add File
            </button>
        </div>
    );
};

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
