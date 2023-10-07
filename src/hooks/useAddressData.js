import { useEffect, useState } from 'react';
import search_address_by_keyword from '../api/search_address';
import useInput from './useInput';

const useDebouncedAddressData = (delay) => {
    const { value, setValue } = useInput('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        setValue(item.place_name);
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const newSearchKeyword = e.target.value;

        if (!selectedItem) {
            setValue(newSearchKeyword);
        } else if (newSearchKeyword !== selectedItem.place_name.trim()) {
            setSelectedItem(null);
            setValue(newSearchKeyword);
        }
    };

    useEffect(() => {
        if (value.trim().length === 0) {
            setData([]);
        }
        if (!selectedItem && value.trim().length > 0) {
            const debounce = setTimeout(() => {
                search_address_by_keyword(value, (result, status) => {
                    console.log(status, result);
                    setData(result);
                    setOpen(true);
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
        open,
    };
};

export default useDebouncedAddressData;
