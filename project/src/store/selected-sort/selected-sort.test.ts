import { selectedSort } from './selected-sort';
import { SelectedSort } from '../../types/state';
import { changeSortType } from './selected-sort';
import { SortType } from '../../const';

describe('Reducer: selectedSort', () => {
  let state: SelectedSort;

  beforeEach(() => {
    state = {sortType: SortType.Popular};
  });

  describe('changeSortType test', () => {
    it('should update sortType to "Price: low to high" if choose price to high sort', () => {
      expect(selectedSort.reducer(state, {type: changeSortType, payload: 'Price: low to high'}))
        .toEqual({sortType: SortType.PriceToHigh});
    });
    it('should update sortType to "Price: high to low" if choose price to low sort', () => {
      expect(selectedSort.reducer(state, {type: changeSortType, payload: 'Price: high to low'}))
        .toEqual({sortType: SortType.PriceToLow});
    });
    it('should update sortType to "Top rated first" if choose top rated sort', () => {
      expect(selectedSort.reducer(state, {type: changeSortType, payload: 'Top rated first'}))
        .toEqual({sortType: SortType.TopRated});
    });
  });
});
