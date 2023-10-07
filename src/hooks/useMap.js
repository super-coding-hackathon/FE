import { useState, useEffect } from 'react';
import generateMap from '../util/generateMap';

const useMap = (mapRef) => {
    const [map, setMap] = useState();

    useEffect(() => {
        if (mapRef.current) {
            setMap(generateMap(mapRef.current));
        }

        return () => {
            mapRef.current = null;
        };
    }, [mapRef]);

    return map;
};

export default useMap;
