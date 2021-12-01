import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { Order } from './OrdersReducer';

export interface StationState {
  order: Record<string, any>;
  status: string;
}

export interface FactoryState {
  stationOne: StationState,
  stationTwo: StationState,
  stationThree: StationState,
  deliveryTruck: StationState
}

const initialState: FactoryState = {
  stationOne: {order: {}, status: 'available'},
  stationTwo: {order: {}, status: 'available'},
  stationThree: {order: {}, status: 'available'},
  deliveryTruck: {order: {}, status: 'available'},
};

export const factorySlice = createSlice({
  name: 'factory',
  initialState,
  reducers: {
    clearStation: (state, action: PayloadAction<string>) => {
      switch(action.payload){
        case 'stationone':
          state.stationOne.order = {}
          break;
        case 'stationtwo':
          state.stationTwo.order = {}
          break;
        case 'stationthree':
          state.stationThree.order = {}
          break;
        case 'deliverytruck':
          state.deliveryTruck.order = {}
          break;
      }
    },
    updateStationOne: (state, action: PayloadAction<Order>) => {
      state.stationOne.order = action.payload;
    },
    updateStationTwo: (state, action: PayloadAction<Order>) => {
      state.stationTwo.order = action.payload;
    },
    updateStationThree: (state, action: PayloadAction<Order>) => {
      state.stationThree.order = action.payload;
    },
    updateDeliveryTruck: (state, action: PayloadAction<Order>) => {
      state.deliveryTruck.order = action.payload;
    },
  },
});

export const { updateStationOne, updateStationTwo, updateStationThree, updateDeliveryTruck, clearStation } = factorySlice.actions;

export const factoryState = (state: RootState) => state.factory;

export default factorySlice.reducer;
