// sagas/authSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { loginRequest, loginSuccess, loginFailure} from "../slices/authSlice"

function* handleLogin(action) {
  try {
    const response = yield call(axios.post, "/api/login", action.payload);
    localStorage.setItem("authUser",JSON.stringify(response.data.user));
    localStorage.setItem("token",response.data.token)
    // const res=localStorage.getItem('authUser')
    yield put(setAuthUser(response.data.data))
    yield put(loginSuccess(response.data.user));
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || error.message));
  }
}

export default function* authSaga() {
  yield takeLatest('AUTH_LOGIN_REQUEST', handleLogin);
}
