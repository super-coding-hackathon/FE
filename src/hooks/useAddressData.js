import { useEffect, useState } from 'react';
import search_address_by_keyword from '../api/search_address';
import useInput from './useInput';

const useDebouncedAddressData = (delay) => {
    const { value, setValue } = useInput('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [data, setData] = useState([]);

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        setValue(item.place_name); // item.text
    };

    const handleInputChange = (e) => {
        const text = e.target.value;

        if (!selectedItem) {
            setValue(text);
        } else if (text !== selectedItem) {
            // seletedItem.place_name
            setSelectedItem(null);
            setValue(text);
        }
    };

    useEffect(() => {
        if (!selectedItem && value.trim().length > 0) {
            const debounce = setTimeout(() => {
                search_address_by_keyword(value, (result) => {
                    setData(result);
                });
            }, delay);

            return () => {
                clearTimeout(debounce);
            };
        }
    }, [value, selectedItem, delay]);

    return {
        handleItemSelect,
        handleInputChange,
        value,
        data,
    };
};

export default useDebouncedAddressData;
