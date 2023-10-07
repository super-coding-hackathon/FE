import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import SearchList from '../../components/SearchList';
import useDebouncedAddressData from '../../hooks/useAddressData';

const MainPage = () => {
    const { value, data, handleInputChange, handleItemSelect, open } = useDebouncedAddressData(600);

    return (
        <Wrap>
            <CustomInput>
                <Form.Control
                    placeholder="매물의 주소를 입력하세요"
                    aria-describedby="search"
                    value={value}
                    onChange={handleInputChange}
                />
                <Button variant="dark">검색</Button>
            </CustomInput>
            {open && <SearchList data={data} handleSelect={handleItemSelect} />}
        </Wrap>
    );
};

export default MainPage;

const Wrap = styled.div`
    display: grid;
    place-items: center;
`;

const CustomInput = styled(InputGroup)`
    margin-top: 200px;
    width: 500px;
`;
