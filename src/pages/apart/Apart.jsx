import styled from 'styled-components';

import MapComponent from '../../components/MapComponent';

const Apart = () => {
    return (
        <Wrap>
            <MapComponent />
            <ListUl>sadfsdf</ListUl>
        </Wrap>
    );
};

export default Apart;

const Wrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 300px;
    height: 100%;
`;

const ListUl = styled.ul``;
