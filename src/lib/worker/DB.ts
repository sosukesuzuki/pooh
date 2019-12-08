import { File } from '../models';

let db: any = null;

function throwNoDexieErrorIfDexieDoesNotExist() {
    if (!db) {
        throw new Error('Dexie has not imported yet');
    }
}

export function getFiles(): Promise<File[]> {
    throwNoDexieErrorIfDexieDoesNotExist();
    return db.files.toArray();
}

export function addFile() {
    throwNoDexieErrorIfDexieDoesNotExist();
    const newFile = new File();
    return db.files.add(newFile);
}

export function updateFile(payload: { id: string; content: string }) {
    throwNoDexieErrorIfDexieDoesNotExist();
    return db.files.put(payload);
}

export function deleteFile(payload: { id: string }) {
    throwNoDexieErrorIfDexieDoesNotExist();
    return db.files.delete(payload.id);
}

console.time('worker:load-dexie');
(async function(): Promise<void> {
    const Dexie = await import(/* webpackChunkName: "dexie" */ 'dexie');
    db = new Dexie.default('FilesDatabase');
    db.version(1).stores({
        files: 'id, content, createdAt',
    });
    console.timeEnd('worker:load-dexie');
})();
