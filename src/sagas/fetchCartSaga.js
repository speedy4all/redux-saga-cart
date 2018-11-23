import { SET_CURRENT_USER, setCartItems } from "../actions";
import { take, put } from "redux-saga/effects";


export function* fetchCartSaga() {
    const { user } = yield take(SET_CURRENT_USER);
    const response = yield fetch(`http://localhost:8081/cart/${user.id}`);
    const { items } = yield response.json();
    yield put(setCartItems(items));
    console.log('Set cart items', items);
}