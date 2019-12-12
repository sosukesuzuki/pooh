import React, { useMemo, useCallback } from 'react';
import {
    useWorkerContext,
    useCurrentFile,
    useUpdateFile,
} from '../lib/contexts';

const FormatButton: React.FC = () => {
    const updateFile = useUpdateFile();
    const { formatMarkdown } = useWorkerContext();
    const currentFile = useCurrentFile();
    const shouldShown = useMemo(() => Boolean(currentFile), [currentFile]);
    const handleClick = useCallback(async () => {
        const formatted = await formatMarkdown(currentFile!.content);
        await updateFile({ id: currentFile!.id, content: formatted });
    }, [currentFile]);
    return <>{shouldShown && <button onClick={handleClick}>Format</button>}</>;
};

export default FormatButton;
