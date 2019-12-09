import React from 'react';
import styled from 'styled-components';
import SideNav from './SideNav';
import Detail from './Detail';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow-y: hidden;
`;

const App: React.FC = () => {
    return (
        <Container>
            <SideNav />
            <Detail />
        </Container>
    );
};

export default App;
