import React, { createContext, useContext, useState, useEffect } from 'react';
import { File } from '../models';
import { useWorkerContext } from './workerContext';

interface FilesContextState {
    files: File[];
    setFiles: (files: File[]) => void;
}
const filesContext = createContext<FilesContextState>({
    files: [],
    setFiles: null as any,
});
export const FileContextProvider: React.FC = ({ children }) => {
    const { getFiles } = useWorkerContext();
    const [files, setFiles] = useState<File[]>([]);
    useEffect(() => {
        getFiles().then(files => {
            setFiles(files);
        });
    }, []);
    return (
        <filesContext.Provider value={{ files, setFiles }}>
            {children}
        </filesContext.Provider>
    );
};

export const useFilesContext = () => {
    return useContext(filesContext);
};

const useUpdateFiles = () => {
    const { getFiles } = useWorkerContext();
    const { setFiles } = useFilesContext();
    return async () => {
        const files = await getFiles();
        setFiles(files);
    };
};

export const useAddFile = () => {
    const { addFile } = useWorkerContext();
    const updateFiles = useUpdateFiles();
    return async () => {
        const file = await addFile();
        await updateFiles();
        return file;
    };
};
export const useUpdateFile = () => {
    const { updateFile } = useWorkerContext();
    const updateFiles = useUpdateFiles();
    return async (payload: { id: string; content: string }) => {
        await updateFile(payload);
        await updateFiles();
    };
};
export const useDeleteFile = () => {
    const { deleteFile } = useWorkerContext();
    const updateFiles = useUpdateFiles();
    return async (payload: { id: string }) => {
        await deleteFile(payload);
        await updateFiles();
    };
};
