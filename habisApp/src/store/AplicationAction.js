import axios from 'axios';
import { ActionTypes } from '../store/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from '../utils/constants';

/**
 * A ction in charge of login
 * @param {object} data
 * @param {string} data.username  username
 * @param {string} data.password  password
 * @param {callback} callback
 */
export const logout = (data, callback) => (dispatch) => {
  dispatch(loading(true))
  axios
    .post('https://order-pizza-api.herokuapp.com/api/auth', {
      password: data.password,
      username: data.username,
    })
    .then(async (res) => {
      await AsyncStorage.setItem('token', res.data.access_token);
      dispatch({
        type: ActionTypes.AUTH,
        payload: 2,
      });
      const order = await getOrder(dispatch);
      dispatch({
        type: ActionTypes.GET_ORDER,
        payload: order.data
      })

      dispatch(loading(false))

    })
    .catch((err) => {
      dispatch(loading(false))
      errorMessage(err, dispatch)
    });

};

/**
 * check that a user is logged in and execute the initial state
 */
export const veryState = () => async (dispatch) => {
  dispatch(loading(true))
  const token = await AsyncStorage.getItem('token');
  dispatch({
    type: ActionTypes.INITIAL_STATE,
    payload: token ? 2 : 1,
  });

  if (token) {
    const order = await getOrder(dispatch);
    dispatch({
      type: ActionTypes.GET_ORDER,
      payload: order.data
    })
  }
  dispatch(loading(false))
};


/**
 * this action creates the new order
 * @param {Object} order
 * @param {string} order.Crust
 * @param {string} order.Flavor
 * @param {integer} order.Order_ID
 * @param {string} order.Size
 * @param {integer} order.Table_No
 * @param {integer} order.Timestamp
 */
export const createNewOrder = (order, callback) => async (dispatch) => {
  dispatch(loading(true))
  const token = await AsyncStorage.getItem('token');
  axios({
    method: "POST",
    url: 'https://order-pizza-api.herokuapp.com/api/orders',
    data: order,
    headers: { "Authorization": `Bearer ${token}` }
  }).then(() => {
    dispatch({
      type: ActionTypes.CREATE_ORDER,
      payload: order
    })
    dispatch(loading(false))
    callback()
  }).catch((err) => {
    dispatch(loading(false))
    errorMessage(err, dispatch)
  })
}

/**
 * error handler in http requests
 * @param {Object} err error
 * @param {()=> void} dispatch Action dispatch
 */
const errorMessage = async (err, dispatch) => {

  if (err.response) {
    toast(err.response.data.msg)
    if (err.response.data.msg == 'Token has expired') {
      dispatch(signOff())
    }
  } else {
    toast('Check your internet connection')
  }
}


/**
 * this action makes the requests of the orders to the server
 * @param {()=> void} dispatch  Action dispatch
 */
export const getOrder = async (dispatch) => {
  try {
    const order = await axios.get('https://order-pizza-api.herokuapp.com/api/orders',)
    return order;
  } catch (error) {
    dispatch(loading(false))
    errorMessage(error, dispatch)
  }
}

/**
 * this action removes the order
 * @param {string} id 
 */
export const deleteOrder = (id, callback) => (dispatch) => {
  dispatch(loading(true))
  axios.delete(`https://order-pizza-api.herokuapp.com/api/orders/${id}`).then(() => {
    dispatch({
      type: ActionTypes.DELETE_ORDER,
      payload: id
    })
    callback()
    dispatch(loading(false))
  }).catch((err) => {
    dispatch(loading(false))
    errorMessage(err, dispatch)
  })
}

/**
 * action used to log out
 */
export const signOff = () => async (dispatch) => {
  await AsyncStorage.removeItem('token');
  dispatch({
    type: ActionTypes.INITIAL_STATE,
    payload: 1,
  });
}

/**
 * loading action is when executing opens or closes a spinner
 * @param {boolean} loading  loading option
 */
const loading = (loading) => {
  return {
    type: ActionTypes.LOADING,
    payload: loading
  }
}