import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import {
    useFilesContext,
    useAddFile,
    useCurrentFileContext,
    useDeleteFile,
} from '../lib/contexts';
import { File } from '../lib/models';

const Container = styled.div`
    border-right: 1px solid black;
    width: 250px;
`;
const FileItemList = styled.div`
    overflow-y: scroll;
`;
const FileListItemWrapper = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    background-color: white;
    ${({ isSelected }: { isSelected: boolean }) =>
        `background-color: ${isSelected ? 'gray' : 'white'};`}
    .body {
        width: 100%;
    }
`;

type FileListItemProps = File;
const FileListItem: React.FC<FileListItemProps> = React.memo(
    ({ content, id }) => {
        const { setCurrentFileId, currentFileId } = useCurrentFileContext();
        const handleClick = useCallback(() => {
            setCurrentFileId(id);
        }, [id, setCurrentFileId]);
        const isSelected = useMemo(() => {
            return currentFileId === id;
        }, [id, currentFileId]);
        const deleteFile = useDeleteFile();
        const handleClickDeleteButton = useCallback(() => {
            deleteFile({ id });
            if (id === currentFileId) {
                setCurrentFileId(undefined);
            }
        }, [id, deleteFile, currentFileId]);
        return (
            <FileListItemWrapper isSelected={isSelected}>
                <div className="body" onClick={handleClick}>
                    {content.slice(0, 20) || 'EMPTY'}
                </div>
                <button onClick={handleClickDeleteButton}>&times;</button>
            </FileListItemWrapper>
        );
    },
);

const SideNav: React.FC = () => {
    const { setCurrentFileId } = useCurrentFileContext();
    const { files } = useFilesContext();
    const addFile = useAddFile();
    const sortedFiles = useMemo(() => {
        return files.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    }, [files]);
    const handleClickAddButton = useCallback(async () => {
        const file = await addFile();
        setCurrentFileId(file.id);
    }, [addFile, setCurrentFileId]);
    return (
        <Container>
            <button onClick={handleClickAddButton}>Add New File</button>
            <FileItemList>
                {sortedFiles.map(file => (
                    <FileListItem key={file.id} {...file} />
                ))}
            </FileItemList>
        </Container>
    );
};

export default SideNav;
