import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCurrentFile, useUpdateFile } from '../lib/contexts';
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
    const [content, setContent] = useState<undefined | string>(
        currentFile?.content,
    );
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
        [currentFile?.id, updateFile],
    );
    useEffect(() => {
        setContent(currentFile?.content);
    }, [currentFile?.id]);
    return (
        <Container>
            {currentFile ? (
                <>
                    <textarea value={content} onChange={handleChangeTextarea} />
                    <div className="preview">{content}</div>
                </>
            ) : (
                <p>Any file is not selected.</p>
            )}
        </Container>
    );
};
export default Detail;
