import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useFilesContext } from './filesContext';

const localStorageKey = 'CURRENT_FILE_ID';

interface CurrentFileContextState {
  currentFileId?: string;
  setCurrentFileId: (value?: string) => void;
}
const currentFileContext = createContext<CurrentFileContextState>({
  currentFileId: undefined,
  setCurrentFileId: null as any,
});
export const useCurrentFileContext = () => {
  return useContext(currentFileContext);
};
export const CurrentFileContextProvider: React.FC = ({ children }) => {
  const [currentFileId, setCurrentFileId] = useState<undefined | string>(() => {
    return localStorage.getItem(localStorageKey) ?? undefined;
  });
  const setCurrentFileIdAndSaveToStorage = useCallback(
    (fileId?: string) => {
      setCurrentFileId(fileId);
      localStorage.setItem(localStorageKey, fileId ?? '');
    },
    [setCurrentFileId],
  );
  return (
    <currentFileContext.Provider
      value={{
        currentFileId,
        setCurrentFileId: setCurrentFileIdAndSaveToStorage,
      }}
    >
      {children}
    </currentFileContext.Provider>
  );
};
export const useCurrentFile = () => {
  const { files } = useFilesContext();
  const { currentFileId } = useCurrentFileContext();
  const currentFile = useMemo(() => {
    return files.find(({ id }) => id === currentFileId);
  }, [files, currentFileId]);
  return currentFile;
};
