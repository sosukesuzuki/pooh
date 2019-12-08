import { createContext, useContext } from 'react';
import { WorkerAPI } from '../worker';

interface WorkerContextState {
    WorkerAPI: WorkerAPI;
}
export const workerContext = createContext<WorkerContextState>(null as any);
export const useWorkerContext = () => {
    return useContext(workerContext);
};
