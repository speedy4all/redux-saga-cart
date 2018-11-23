import { put, take } from "redux-saga/effects";
import { eventChannel } from 'redux-saga'
import { connect } from '../createSocketConnection'
import { setCustomerServiceAvailability } from "../actions";

export function* customerServiceAvailabilitySaga() {
    const socket = connect();
    const chan = new eventChannel(emit => {
        const enableSupportMessages = () => {
            emit(true);
        };
        const disableSupportMessage = () => {
            emit(false);
        }

        socket.on('SUPPORT_AVAILABLE', enableSupportMessages);
        socket.on('SUPPORT_NOT_AVAILABLE', disableSupportMessage);

        return () => {

        }
    });

    while(true) {
        let supportAvailable = yield take(chan);
        yield put(setCustomerServiceAvailability(supportAvailable));
    }
}