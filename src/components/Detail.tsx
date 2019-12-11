import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    useCurrentFile,
    useUpdateFile,
    useCompiledMarkdown,
} from '../lib/contexts';
import debounce from 'lodash.debounce';

const Container = styled.div`
    width: 100%;
    display: flex;
    textarea {
        width: 50%;
        resize: none;
    }
    .preview {
        width: 50%;
    }
`;
const Detail: React.FC = () => {
    const updateFile = useUpdateFile();
    const currentFile = useCurrentFile();
    const [content, setContent] = useState(currentFile?.content ?? '');
    const compiled = useCompiledMarkdown(content ?? '');
    useEffect(() => {
        setContent(currentFile?.content ?? '');
    }, [currentFile]);

    const handleChangeTextarea = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            e.persist();
            if (!currentFile) {
                return;
            }
            setContent(e.target.value);
            debounce(() => {
                updateFile({ id: currentFile.id, content: e.target.value });
            }, 200)();
        },
        [currentFile, updateFile],
    );
    return (
        <Container>
            {currentFile ? (
                <>
                    <textarea value={content} onChange={handleChangeTextarea} />
                    <div
                        className="preview"
                        dangerouslySetInnerHTML={{ __html: compiled }}
                    />
                </>
            ) : (
                <p>Any file is not selected.</p>
            )}
        </Container>
    );
};
export default Detail;
