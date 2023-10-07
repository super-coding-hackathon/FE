import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import styled from 'styled-components';

const GeneralLayout = () => {
    return (
        <Wrap>
            <Header />
            <OutletWrap>
                <Outlet />
            </OutletWrap>
        </Wrap>
    );
};

export default GeneralLayout;

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const OutletWrap = styled.div`
    flex-grow: 1;
    background-color: rgb(128, 128, 128, 0.4);
`;
