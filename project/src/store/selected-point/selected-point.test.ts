import { selectedPoint } from './selected-point';
import { SelectedPoint } from '../../types/state';
import { setPoint } from './selected-point';
import { makeFakePointData } from '../../utils/mocks';

const pointData = makeFakePointData();

describe('Reducer: selectedPoint', () => {
  let state: SelectedPoint;

  beforeEach(() => {
    state = {point: null};
  });

  it('should update point to "pointData" on mouse enter some offer', () => {
    expect(selectedPoint.reducer(state, {type: setPoint, payload: pointData}))
      .toEqual({point: pointData});
  });
  it('should update point to "null" on mouse leave some offer', () => {
    expect(selectedPoint.reducer(state, {type: setPoint, payload: null}))
      .toEqual({point: null});
  });
});
