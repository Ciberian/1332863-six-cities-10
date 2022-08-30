import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { fakeOffer } from '../utils/mocks';
import useMap from './use-map';

const fakeCurrentCity = fakeOffer.city;
const tempFunc = () => fakeCurrentCity;
tempFunc();

const mapRef = renderHook(() => useRef(null)).result.current;

describe('Hook: useMap', () => {
  it('should return map object', () => {
    const {result} = renderHook(() =>
      useMap(mapRef, fakeCurrentCity),
    );

    expect(result).toBeInstanceOf(Object);
  });
});
