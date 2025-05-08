// sagas/authSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { fetchTasks, selectTaskError, selectTaskLoading } from "../slices/taskSlice";


function* handleTasks(action) {
    const token=localStorage.getItem('token')
  try {
    yield put(selectTaskLoading(true));
    const response = yield call(axios.post, "/api/admin/getAllTasks", action.payload,{headers:{Authorization:`Bearer ${token}`}});
    yield put(fetchTasks(response.data.user));
    yield put(selectTaskLoading(false));
  } catch (error) {
    yield put(selectTaskError(error.response?.data?.message || error.message));
  }
}

export default function* taskSaga() {
  yield takeLatest('FETCH_ALL_TASKS', handleTasks);
}
