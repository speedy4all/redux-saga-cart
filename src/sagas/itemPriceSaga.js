import { take, all, fork, put, call } from "redux-saga/effects";
import { SET_CURRENT_USER, SET_CART_ITEMS, setItemPrice } from "../actions";


export function* fetchItemPrice(id, currency) {
    const response = yield fetch(`http://localhost:8081/prices/${currency}/${id}`);
    const json = yield response.json();
    const price = json[0].price;
    yield put(setItemPrice(id, price));
}

export function* itemPriceSaga() {
    const [{user}, {items}]  = yield all([
        take(SET_CURRENT_USER),
        take(SET_CART_ITEMS)
    ]);

    yield items.map(item => call(fetchItemPrice, item.id, user.country));
}