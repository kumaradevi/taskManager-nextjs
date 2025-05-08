import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authSliceReducer from './slices/authSlice';
import rootSaga from './sagas/rootSaga'; 
import taskSliceReducer from "./slices/taskSlice";

const sagaMiddleware = createSagaMiddleware();

export const initializeStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      auth: authSliceReducer,
      task:taskSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
      }).concat(sagaMiddleware),
    preloadedState, 
  });

  sagaMiddleware.run(rootSaga);

  return store;
};




