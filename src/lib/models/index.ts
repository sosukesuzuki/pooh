import uuid from 'uuid/v4';

export class File {
    content: string;
    readonly id: string;

    constructor() {
        this.content = '';
        this.id = uuid();
    }
}
