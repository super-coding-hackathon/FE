import { atom } from 'recoil';

const apartCoords = atom({
    key: 'apart',
    default: {
        lat: 37.498086,
        lng: 127.028001,
    },
});

const studioCoords = atom({
    key: 'studio',
    default: {
        lat: 37.498086,
        lng: 127.028001,
    },
});

const officeCoords = atom({
    key: 'office',
    default: {
        lat: 37.498086,
        lng: 127.028001,
    },
});
