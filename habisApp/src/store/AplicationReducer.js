/* eslint-disable import/prefer-default-export */
import { ActionTypes } from './constants';

const AplicationState = {
  auth: false,
  order: []
};

export const AplicationReducer = (state = AplicationState, action) => {
  switch (action.type) {
    case ActionTypes.INITIAL_STATE: {
      return { ...state, auth: action.payload };
    }
    case ActionTypes.AUTH: {
      return { ...state, auth: action.payload };
    }

    case ActionTypes.GET_ORDER: {
      return { ...state, order: action.payload }
    }
    case ActionTypes.DELETE_ORDER: {
      const orders = state.order.filter((order => {
        return action.payload !== order.Order_ID
      }))

      return { ...state, order: orders.slice() }
    }
    case ActionTypes.CREATE_ORDER: {
      return { ...state, order: state.order.concat(action.payload) }
    }
    default: {
      return state;
    }
  }
};
