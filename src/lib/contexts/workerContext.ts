import { createContext, useContext, useState, useEffect } from 'react';
import { WorkerAPI } from '../worker';

export const workerContext = createContext<WorkerAPI>(null as any);
export const useWorkerContext = () => {
    return useContext(workerContext);
};
export const useCompiledMarkdown = (value: string) => {
    const [compiled, setCompiled] = useState('');
    const { compileMarkdown } = useWorkerContext();
    useEffect(() => {
        compileMarkdown(value).then(data => {
            setCompiled(data);
        });
    }, [value]);
    return compiled;
};
