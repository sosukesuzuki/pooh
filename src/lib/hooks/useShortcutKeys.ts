import { useEffect } from 'react';
import {
    useWorkerContext,
    useCurrentFile,
    useUpdateFile,
    useAddFile,
    useCurrentFileContext,
} from '../contexts';

export function useShortcutKeys() {
    const currentFile = useCurrentFile();
    const updateFile = useUpdateFile();
    const { setCurrentFileId } = useCurrentFileContext();
    const addFile = useAddFile();
    const { formatMarkdown } = useWorkerContext();
    useEffect(() => {
        async function onWindowKeyDown(ev: KeyboardEvent) {
            const meta = ev.metaKey || ev.ctrlKey;
            const shift = ev.shiftKey;

            // ctrl + shift + f
            if (meta && shift && ev.keyCode === 70) {
                ev.preventDefault();
                if (!currentFile) {
                    return;
                }
                const formatted = await formatMarkdown(currentFile.content);
                await updateFile({ id: currentFile.id, content: formatted });
            }

            // ctrl + n
            if (meta && ev.keyCode === 78) {
                const file = await addFile();
                setCurrentFileId(file.id);
            }
        }
        window.addEventListener('keydown', onWindowKeyDown);
        return () => {
            window.removeEventListener('keydown', onWindowKeyDown);
        };
    }, [currentFile, updateFile, formatMarkdown]);
}
