import { expose } from 'comlink';
import { addFile, updateFile, getFiles, deleteFile } from './DB';
import { compileMarkdown } from './remark';
import { File } from '../models';
import { format } from './prettier';

export class WorkerAPI {
    addFile(): Promise<void> {
        return addFile();
    }
    updateFile(payload: { id: string; content: string }): Promise<void> {
        return updateFile(payload);
    }
    getFiles(): Promise<File[]> {
        return getFiles();
    }
    deleteFile(payload: { id: string }): Promise<void> {
        return deleteFile(payload);
    }
    compileMarkdown(value: string): Promise<string> {
        return Promise.resolve(compileMarkdown(value));
    }
    formatMarkdown(value: string): Promise<string> {
        return Promise.resolve(format(value));
    }
}

expose(WorkerAPI);
