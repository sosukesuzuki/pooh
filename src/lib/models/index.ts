import uuid from 'uuid/v4';

export class File {
  content: string;
  readonly id: string;
  readonly createdAt: string;

  constructor() {
    this.content = '';
    this.id = uuid();
    this.createdAt = new Date().toISOString();
  }
}
