import { takeEvery, call, put } from 'redux-saga/effects';
import _ from 'lodash';

import CommonActions from '../constants/action-types/common';

/*
|-------------------------------------------------------------------------------
| Handle all API requests
|-------------------------------------------------------------------------------
*/

function* handleApiCall(action) {
  // TODO {Maksym}: re-work onSuccessCallback
  const { promise, onSuccessCallback, placeholderData } = action;
  const { START, SUCCESS, FAIL } = action.subtypes;

  // TODO {Maksym}: add action object validation

  // Notify application that API call was STARTed
  yield put({ type: START });

  try {
    // Resolve API promise
    const response = yield call(promise);

    // Parse server response data
    console.log('loginuserin saga', response)
    const result = yield response.data;

    // Store hardcoded data if any or request response to the Redux
    yield put({
      type: SUCCESS,
      payload: placeholderData || result,
    });

    // Call onSuccessCallback callback if it was passed
    if (onSuccessCallback && _.isFunction(onSuccessCallback)) {
      yield call(onSuccessCallback);
    }
  } catch (errors) {
    // TODO {Maksym} check errors for unauthorized status to logout user from the app

    // Store request error to the Redux
    yield put({ type: FAIL, errors });
  }
}

/*
|-------------------------------------------------------------------------------
| Export sagas
|-------------------------------------------------------------------------------
*/

export default function* () {
  yield takeEvery(CommonActions.COMMON_API_CALL, handleApiCall);
}
