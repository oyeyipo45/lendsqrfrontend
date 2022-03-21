import axios from 'axios'

import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  WITHDRAWAL_REQUEST,
  WITHDRAWAL_SUCCESS,
  WITHDRAWAL_FAIL,
  LODGEMENT_REQUEST,
  LODGEMENT_SUCCESS,
  LODGEMENT_FAIL,
  TRANSFER_REQUEST,
  TRANSFER_SUCCESS,
  TRANSFER_FAIL,
} from './constants';

const BASE_URL = process.env.REACT_APP_BASE_URL

console.log(BASE_URL, 'BASE_URL');

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${BASE_URL}/login`, { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LOGOUT });
};


export const register = (first_name, last_name, email, username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${BASE_URL}/register`, { first_name, last_name, email, username, password }, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log(userInfo?.data?.token, 'usernfo');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    };
    const { data } = await axios.get(`${BASE_URL}/user`, config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const withdraw = (amount) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WITHDRAWAL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    };
    const { data } = await axios.put(`${BASE_URL}/withdraw`, { amount }, config);

    dispatch({
      type: WITHDRAWAL_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: WITHDRAWAL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const lodgement = (amount) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LODGEMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    };
    const { data } = await axios.put(`${BASE_URL}/fund-wallet`, { amount }, config);

    dispatch({
      type: LODGEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LODGEMENT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const transfer = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSFER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.data?.token}`,
      },
    };
    const { data } = await axios.post(`${BASE_URL}/transfer`, { payload }, config);

    dispatch({
      type: TRANSFER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSFER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};