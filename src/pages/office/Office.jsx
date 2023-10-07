import useMapByAddress from '../../hooks/useMapByAddress';
import { useRef } from 'react';
import styled from 'styled-components';

const Office = () => {
    const mapRef = useRef(null);
    const chageAddress = useMapByAddress(mapRef);

    return (
        <Wrap>
            <div ref={mapRef}></div>
            <div>asdasd</div>
        </Wrap>
    );
};

export default Office;

const Wrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 300px;
    height: 100%;
`;
