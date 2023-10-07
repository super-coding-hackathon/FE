import { useRef } from 'react';
import styled from 'styled-components';

const Apart = () => {
    const mapRef = useRef();

    return (
        <Wrap>
            <MapComponent ref={mapRef} />
            <ListUl></ListUl>
        </Wrap>
    );
};

export default Apart;

const Wrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 300px;
`;

const MapComponent = styled.div``;

const ListUl = styled.ul``;
