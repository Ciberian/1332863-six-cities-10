import { CITIES } from '../../const';
import { selectedCity, changeCity } from './selected-city';

const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];

describe('Reducer: selectedCity', () => {
  let state: {city: 'Paris'};

  it('should select one city from CITIES list if select city', () => {
    expect(selectedCity.reducer(state, {type: changeCity, payload: randomCity}))
      .toEqual({city: randomCity});
  });
});
