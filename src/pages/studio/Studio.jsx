import styled from 'styled-components';
import MapComponent from '../../components/MapComponent';

const Studio = () => {
    return (
        <Wrap>
            <MapComponent />
            <ListUl>asdasd</ListUl>
        </Wrap>
    );
};

export default Studio;

const Wrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 300px;
    height: 100%;
`;
const ListUl = styled.ul``;
