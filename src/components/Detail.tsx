import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    useCurrentFile,
    useUpdateFile,
    useCompiledMarkdown,
} from '../lib/contexts';
import 'github-markdown-css';
import 'highlight.js/styles/default.css';

const Container = styled.div`
    width: 100%;
    display: flex;
    textarea {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
        width: 50%;
        resize: none;
        overflow-y: scroll;
        background-color: #282a36;
        color: #8be9fd;
        font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier,
            monospace;
    }
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
        width: 50%;
        overflow-y: scroll;
    }
`;
const Detail: React.FC = () => {
    const updateFile = useUpdateFile();
    const currentFile = useCurrentFile();
    const [content, setContent] = useState(currentFile?.content ?? '');
    const compiled = useCompiledMarkdown(currentFile?.content ?? '');
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
            updateFile({ id: currentFile.id, content: e.target.value });
        },
        [currentFile, updateFile],
    );
    return (
        <Container>
            {currentFile ? (
                <>
                    <textarea value={content} onChange={handleChangeTextarea} />
                    <div
                        className="markdown-body"
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
