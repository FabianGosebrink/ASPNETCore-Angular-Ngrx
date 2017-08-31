import { FoodItem } from '../../../shared/models/foodItem.model';
import * as AccountActions from '../actions/account.actions';

export interface AccountState {
    authenticated: boolean;
    errorMessage: string;
};

export const initialState: AccountState = {
    authenticated: false,
    errorMessage: ''
};

export function accountReducer(state = initialState, action: any): AccountState {
    switch (action.type) {

        case AccountActions.LOGIN_SUCCESS:
            const loginSuccessAction = <AccountActions.LoginSuccessAction>action;
            return Object.assign({}, state, {
                authenticated: true,
                errorMessage: ''
            });

        default:
            return state;

    }
}

