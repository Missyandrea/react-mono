import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const ORDER_SLICE_FEATURE_KEY = 'orderSlice';

/*
 * Update these interfaces according to your requirements.
 */
export interface OrderSliceEntity {
  id: number;
}

export interface OrderSliceState extends EntityState<OrderSliceEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const orderSliceAdapter = createEntityAdapter<OrderSliceEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchOrderSlice())
 * }, [dispatch]);
 * ```
 */
export const fetchOrderSlice = createAsyncThunk<OrderSliceEntity[]>(
  'orderSlice/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getOrderSlices()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialOrderSliceState: OrderSliceState =
  orderSliceAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const orderSliceSlice = createSlice({
  name: ORDER_SLICE_FEATURE_KEY,
  initialState: initialOrderSliceState,
  reducers: {
    add: orderSliceAdapter.addOne,
    remove: orderSliceAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderSlice.pending, (state: OrderSliceState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchOrderSlice.fulfilled,
        (state: OrderSliceState, action: PayloadAction<OrderSliceEntity[]>) => {
          orderSliceAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchOrderSlice.rejected, (state: OrderSliceState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const orderSliceReducer = orderSliceSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(orderSliceActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const orderSliceActions = orderSliceSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllOrderSlice);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = orderSliceAdapter.getSelectors();

export const getOrderSliceState = (rootState: {
  [ORDER_SLICE_FEATURE_KEY]: OrderSliceState;
}): OrderSliceState => rootState[ORDER_SLICE_FEATURE_KEY];

export const selectAllOrderSlice = createSelector(
  getOrderSliceState,
  selectAll
);

export const selectOrderSliceEntities = createSelector(
  getOrderSliceState,
  selectEntities
);
