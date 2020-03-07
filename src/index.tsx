import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import WorkerProxy from './WorkerProxy';
import {
  workerContext,
  FileContextProvider,
  CurrentFileContextProvider,
} from './lib/contexts';
import App from './components/App';

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
