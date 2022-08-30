// import { renderHook } from '@testing-library/react';
import { fakeOffer } from '../utils/mocks';
// import useMap from './use-map';

const fakeCurrentCity = fakeOffer.city;
const tempFunc = () => fakeCurrentCity;
tempFunc();

// const map: HTMLElement = <div style={{height: '100%'}}></div>;

// const mapRef: React.MutableRefObject<HTMLElement | null> = { current: map };

// describe('Hook: useMap', () => {
//   it('should return map Element with heigh 100%', () => {
//     const {result} = renderHook(() =>
//       useMap(mapRef, fakeCurrentCity),
//     );

//     expect(result.current).toHaveHeight(100);
//   });
// });
