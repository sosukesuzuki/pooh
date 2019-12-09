import React, { useCallback } from 'react';
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
    const handleChangeTextarea = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!currentFile) {
                return;
            }
            updateFile({ id: currentFile.id, content: e.target.value });
        },
        [currentFile, debounce],
    );
    return (
        <Container>
            {currentFile ? (
                <>
                    <textarea
                        value={currentFile.content}
                        onChange={handleChangeTextarea}
                    />
                    <div className="preview">{currentFile.content}</div>
                </>
            ) : (
                <p>Any file is not selected.</p>
            )}
        </Container>
    );
};
export default Detail;
