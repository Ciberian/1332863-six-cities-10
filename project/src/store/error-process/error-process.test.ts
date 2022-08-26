import { errorProcess, setError } from './error-process';

describe('Reducer: userProcess', () => {

  it('should update the error message when an error occurs', () => {
    expect(errorProcess.reducer({error: null}, {type: setError, payload: 'Alarm!!!'}))
      .toEqual({error: 'Alarm!!!'});
  });
});
