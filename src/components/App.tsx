import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import SideNav from './SideNav';
import Detail from './Detail';
import FormatButton from './FormatButton';
import { useShortcutKeys } from '../lib/hooks';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow-y: hidden;
`;
const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  display: flex;
  flex-flow: column;
  button {
    margin-top: 10px;
  }
`;

const IS_HIDDEN_SIDE_NAV_LOCALSTORAGE_KEY = 'IS_HIDDEN_SIDE_NAV_LOCALSTORAGE';

const App: React.FC = () => {
  useShortcutKeys();
  const [isHiddenSideNav, setIsHiddenSideNav] = useState(() => {
    return (
      localStorage.getItem(IS_HIDDEN_SIDE_NAV_LOCALSTORAGE_KEY) !== 'false'
    );
  });
  const handleClickHideSideNavButton = useCallback(() => {
    setIsHiddenSideNav(v => {
      localStorage.setItem(IS_HIDDEN_SIDE_NAV_LOCALSTORAGE_KEY, String(!v));
      return !v;
    });
  }, [setIsHiddenSideNav]);
  return (
    <Container>
      {!isHiddenSideNav && <SideNav />}
      <Detail />
      <ButtonsContainer>
        <FormatButton />
        <button onClick={handleClickHideSideNavButton}>
          {isHiddenSideNav ? 'Show' : 'Hide'} SideNav
        </button>
      </ButtonsContainer>
    </Container>
  );
};

export default App;
