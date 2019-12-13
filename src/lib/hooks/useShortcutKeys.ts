import { useEffect } from 'react';
import { useWorkerContext, useCurrentFile, useUpdateFile } from '../contexts';

export function useShortcutKeys() {
    const currentFile = useCurrentFile();
    const updateFile = useUpdateFile();
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
        }
        window.addEventListener('keydown', onWindowKeyDown);
        return () => {
            window.removeEventListener('keydown', onWindowKeyDown);
        };
    }, [currentFile, updateFile, formatMarkdown]);
}
