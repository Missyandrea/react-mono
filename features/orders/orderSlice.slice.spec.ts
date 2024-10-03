import {
  fetchOrderSlice,
  orderSliceAdapter,
  orderSliceReducer,
} from './orderSlice.slice';

describe('orderSlice reducer', () => {
  it('should handle initial state', () => {
    const expected = orderSliceAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(orderSliceReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchOrderSlice', () => {
    let state = orderSliceReducer(undefined, fetchOrderSlice.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
        ids: [],
      })
    );

    state = orderSliceReducer(
      state,
      fetchOrderSlice.fulfilled([{ id: 1 }], '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );

    state = orderSliceReducer(
      state,
      fetchOrderSlice.rejected(new Error('Uh oh'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
        ids: [1],
      })
    );
  });
});
