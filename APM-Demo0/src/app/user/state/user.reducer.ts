import {User} from '../user';
import * as fromRoot from '../../state/app.state';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserActions, UserActionTypes} from './user.action';


export interface State extends fromRoot.AppState {
  users: UserState;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
  currentUserId: number;
  selectedUser: User;
  selectedUserId: number;
  users: User[];
}

const initialState: UserState = {
  currentUser: null,
  currentUserId: 3,
  maskUserName: true,
  selectedUser: null,
  selectedUserId: 5,
  users: []
};

const getUsersFeatureState = createFeatureSelector<UserState>('users');
export const getCurrentUserId = createSelector(
  getUsersFeatureState,
  state => state.currentUserId
);
export const getCurrentUser = createSelector(
  getUsersFeatureState,
  getCurrentUserId,
  (state, currentUserId) => state.users.find(user => user.id === currentUserId)
);
export const getMaskUserName = createSelector(
  getUsersFeatureState,
  state => state.maskUserName
);

export function reducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };
    default :
      return state;
  }
}
