import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import SideNav from './SideNav';
import Detail from './Detail';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow-y: hidden;
`;
const HideSideNavButton = styled.button`
    position: absolute;
    bottom: 30px;
    left: 30px;
`;

const IS_HIDDEN_SIDE_NAV_LOCALSTORAGE_KEY = 'IS_HIDDEN_SIDE_NAV_LOCALSTORAGE';

const App: React.FC = () => {
    const [isHiddenSideNav, setIsHiddenSideNav] = useState(() => {
        return (
            localStorage.getItem(IS_HIDDEN_SIDE_NAV_LOCALSTORAGE_KEY) !==
            'false'
        );
    });
    const handleClickHideSideNavButton = useCallback(() => {
        setIsHiddenSideNav(v => {
            localStorage.setItem(
                IS_HIDDEN_SIDE_NAV_LOCALSTORAGE_KEY,
                String(!v),
            );
            return !v;
        });
    }, [setIsHiddenSideNav]);
    return (
        <Container>
            {!isHiddenSideNav && <SideNav />}
            <Detail />
            <HideSideNavButton onClick={handleClickHideSideNavButton}>
                Hide SideNav
            </HideSideNavButton>
        </Container>
    );
};

export default App;
