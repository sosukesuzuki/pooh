import { File } from '../models';

let db: any = null;

export function getFiles(): Promise<File[]> {
    return db.files.toArray();
}

export function addFile() {
    const newFile = new File();
    return db.files.add(newFile);
}

export function updateFile(payload: { id: string; content: string }) {
    return db.files.put(payload);
}

export function deleteFile(payload: { id: string }) {
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
