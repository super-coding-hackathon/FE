import { useRef, useEffect } from 'react';
import generateMap from '../util/generateMap';

const { kakao } = window;

const MapComponent = ({ handler }) => {
    const mapRef = useRef();

    useEffect(() => {
        const map = generateMap(mapRef.current);
        const handleDragEnd = () => {
            const coords = map.getCenter();

            console.log(coords.getLat(), coords.getLng());
            if (handler) {
                handler(coords.getLat(), coords.getLng());
            }
        };

        if (!map) return;

        const mapsEvent = kakao.maps.event;

        mapsEvent.addListener(map, 'dragend', handleDragEnd);
        return () => {
            mapsEvent.removeListener(map, 'dragend', handleDragEnd);
        };
    }, []);

    return <div ref={mapRef}></div>;
};

export default MapComponent;
