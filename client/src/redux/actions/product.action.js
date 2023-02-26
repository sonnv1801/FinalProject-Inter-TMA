import { createAction } from '.';
import { productSevice } from '../../services';
import {
  FETCH_DETAIL,
  FETCH_PRODUCT,
  FETCH_PRODUCT_10DAYS,
  FETCH_PRODUCT_TYPE,
  FETCH_PRODUCT_TYPE_SAMSUNG,
  START_LOADING,
  STOP_LOADING,
} from '../type/types';

export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

export const getProduct = () => {
  return (dispatch) => {
    dispatch(startLoading());
    productSevice
      .getAllProduct()
      .then((res) => {
        dispatch(createAction(FETCH_PRODUCT, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        dispatch(stopLoading());
      });
  };
};

export const getProduct10days = () => {
  return (dispatch) => {
    dispatch(startLoading());
    productSevice
      .getProduct10days()
      .then((res) => {
        dispatch(createAction(FETCH_PRODUCT_10DAYS, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const getDetail = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    productSevice
      .getDetail(id)
      .then((res) => {
        dispatch(createAction(FETCH_DETAIL, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const getProductType = (type, limit) => {
  return (dispatch) => {
    dispatch(startLoading());
    productSevice
      .getProductType(type, limit)
      .then((res) => {
        dispatch(createAction(FETCH_PRODUCT_TYPE, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const getProductTypeSamsung = (limit) => {
  return (dispatch) => {
    dispatch(startLoading());
    productSevice
      .getProductTypeSamsung(limit)
      .then((res) => {
        dispatch(createAction(FETCH_PRODUCT_TYPE_SAMSUNG, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
