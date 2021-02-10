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
  axios
    .post('https://order-pizza-api.herokuapp.com/api/auth', {
      password: data.password,
      username: data.username,
    })
    .then(async (res) => {
      await AsyncStorage.setItem('token', res.data.access_token);
      await getOrder()
      dispatch({
        type: ActionTypes.AUTH,
        payload: true,
      });

      if (token) {
        const order = await getOrder();
        dispatch({
          type: ActionTypes.GET_ORDER,
          payload: order.data
        })
      }
    })
    .catch((err) => {
      callback(err.response.data.msg);
    });

};

/**
 * check that a user is logged in and execute the initial state
 */
export const veryState = () => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');
  dispatch({
    type: ActionTypes.INITIAL_STATE,
    payload: token ? true : false,
  });

  if (token) {
    const order = await getOrder();
    dispatch({
      type: ActionTypes.GET_ORDER,
      payload: order.data
    })
  }
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
    callback()
  }).catch(err => {
    errorMessage(err, dispatch)
  })
}

const errorMessage = async (err, dispatch) => {
  if (err.response) {
    toast(err.response.data.msg)
    if (err.response.data.msg == 'Token has expired') {
      console.log('entro aqui')
      dispatch(signOff())
    }
  } else {
    toast('Check your internet connection')
  }
}

export const getOrder = async () => {
  const order = await axios.get('https://order-pizza-api.herokuapp.com/api/orders',)
  return order;
}

/**
 * this action removes the order
 * @param {string} id 
 */
export const deleteOrder = (id, callback) => (dispatch) => {
  axios.delete(`https://order-pizza-api.herokuapp.com/api/orders/${id}`).then(() => {
    dispatch({
      type: ActionTypes.DELETE_ORDER,
      payload: id
    })
    callback()
  })
}

export const signOff = () => async (dispatch) => {
  await AsyncStorage.removeItem('token');
  dispatch({
    type: ActionTypes.INITIAL_STATE,
    payload: false,
  });
}
