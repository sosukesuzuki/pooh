import { wrap } from 'comlink';

export default wrap(new Worker('./lib/worker/index.ts', { type: 'module' }));
