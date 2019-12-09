import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import WorkerProxy from './WorkerProxy';
import {
    workerContext,
    FileContextProvider,
    useFilesContext,
    useAddFile,
} from './lib/contexts';
import { CurrentFileContextProvider } from './lib/contexts/currentFileContext';

const App = () => {
    const { files } = useFilesContext();
    const addFile = useAddFile();
    return (
        <div>
            <h1>Pooh</h1>
            <button
                onClick={async () => {
                    await addFile();
                }}
            >
                Add File
            </button>
            {files.map(file => (
                <p key={file.id}>{file.id}</p>
            ))}
        </div>
    );
};

async function main(): Promise<void> {
    const proxy = await new (WorkerProxy as any)();
    ReactDOM.render(
        <workerContext.Provider value={proxy}>
            <FileContextProvider>
                <CurrentFileContextProvider>
                    <App />
                </CurrentFileContextProvider>
            </FileContextProvider>
        </workerContext.Provider>,
        document.querySelector('.root'),
    );
}

main();
