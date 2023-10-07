import { useEffect, useState } from 'react';
import generateMap from '../util/generateMap';

const { kakao } = window;
const geo = new kakao.maps.services.Geocoder();

const useMapByAddress = (element, options?) => {
    const map = generateMap(element, options);
    const [address, setAddress] = useState('');

    const chageAddress = (newAddr) => {
        setAddress(newAddr);
    };

    useEffect(() => {
        geo.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const { x, y } = result[0];
                const coords = new kakao.maps.LatLng(y, x);

                const marker = new kakao.maps.Marker({
                    map,
                    position: coords,
                });

                const info = new kakao.maps.infoWindow({
                    content: `<div style="width:150px;text-align:center;padding:6px 0;">${address}</div>`,
                });

                info.open(map, marker);

                map.setCenter(coords);
            }
            if (status === kakao.maps.services.Status.ZERO_RESULT) {
                console.log('검색결과가 없습니다.');
            }
            if (status === kakao.maps.services.Status.ERROR) {
                console.log('에러 발생');
            }
        });
    }, [address]);

    return chageAddress;
};

export default useMapByAddress;
