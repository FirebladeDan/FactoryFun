import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

export interface Order {
  guid: string,
  status: string,
  location: string,
  createdAt: number,
  modifiedAt: number,
}

export interface OrderState {
    orders: Array<Order>
}

const initialState: OrderState = {
    orders: [
        {guid: '163a2fa3-2d3c-4bc0-8ad5-42f761795aa9', status: 'new', location: 'queue', createdAt: 1637330390, modifiedAt: 1638330390}, 
        {guid: '3a9f3fd1-7299-45bb-90c6-5e97583cc922', status: 'new', location: 'queue', createdAt: 1638230190, modifiedAt: 1638330190}
    ]
};


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    updateOrders: (state, action: PayloadAction<Order>) => {
    
      //Find and Remove current order in list
      let result = state.orders;
      let counter = 0;
      let indexOfGuid = -1;
      for(const order of state.orders){
          if(order.guid === action.payload.guid){
            indexOfGuid = counter;
          }
          counter++;
      }

      result[indexOfGuid] = action.payload;

      state.orders = result;
    },
  },
});

export const { updateOrders } = orderSlice.actions;

export const ordersState = (state: RootState) => state.order;

export default orderSlice.reducer;
