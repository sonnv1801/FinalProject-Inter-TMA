import {
  ADD_CART,
  DELETE_CART,
  FETCH_BANNER,
  FETCH_DETAIL,
  FETCH_PRODUCT,
  FETCH_PRODUCT_10DAYS,
  FETCH_PRODUCT_TYPE,
  FETCH_PRODUCT_TYPE_SAMSUNG,
  FETCH_TYPE_PRODUCT,
  GET_USER,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  NUMBER_QUANTITY,
  REGISTER_FAILED,
  REGISTER_START,
  REGISTER_SUCCESS,
  START_LOADING,
  STOP_LOADING,
} from '../type/types';
import Swal from 'sweetalert2';
const initialState = {
  listUser: [],
  listBanner: [],
  listType: [],
  listProduct: [],
  listProduct10days: [],
  listProductType: [],
  listProductTypeSamsung: [],
  productDetail: null,
  cart: [],
  login: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  register: {
    isFetching: false,
    error: false,
    success: false,
  },
  logout: {
    isFetching: false,
    error: false,
  },
};

const defaultReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_USER: {
      state.listUser = payload;
      return { ...state }; //setState
    }
    case LOGIN_START: {
      state.login.isFetching = true;
      return { ...state };
    }
    case LOGIN_SUCCESS: {
      state.login.isFetching = false;
      state.login.currentUser = payload;
      state.login.error = false;
      return { ...state };
    }
    case LOGIN_FAILED: {
      state.login.isFetching = false;
      state.login.error = true;
      return { ...state };
    }
    case REGISTER_START: {
      state.register.isFetching = true;
      return { ...state };
    }
    case REGISTER_SUCCESS: {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
      return { ...state };
    }
    case REGISTER_FAILED: {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
      return { ...state };
    }
    //Banner
    case FETCH_BANNER: {
      state.listBanner = payload;
      return { ...state }; //setState
    }
    //Typroduct

    case FETCH_TYPE_PRODUCT: {
      state.listType = payload;
      return { ...state }; //setState
    }

    //Product

    case FETCH_PRODUCT: {
      state.listProduct = payload;
      return { ...state }; //setState
    }

    case FETCH_PRODUCT_10DAYS: {
      state.listProduct10days = payload;
      return { ...state };
    }

    case FETCH_DETAIL: {
      state.productDetail = payload;
      return { ...state };
    }

    case FETCH_PRODUCT_TYPE: {
      state.listProductType = payload;
      return { ...state };
    }

    case FETCH_PRODUCT_TYPE_SAMSUNG: {
      state.listProductTypeSamsung = payload;
      return { ...state };
    }

    //cart

    case ADD_CART: {
      let cart = [...state.cart];
      const index = cart.findIndex((cart) => {
        return cart.id === action.payload.id;
      });

      if (index !== -1) {
        cart[index].quantity_cart += 1;
        Swal.fire('Đã Thêm Một Sản Phẩm Trùng Vào Giỏ', 'success');
      } else {
        cart = [...cart, action.payload];
        Swal.fire('Thêm Thành Công Rồi Áaaaa!', 'success');
      }
      // cart.push(action.payload);
      state.cart = cart;
      localStorage.setItem('carts', JSON.stringify(cart));
      return { ...state };
    }
    case DELETE_CART: {
      let cart = [...state.cart];
      const index = cart.findIndex((cart) => {
        return cart._id === payload._id;
      });
      if (index !== -1) {
        cart.splice(cart[index], 1);
      }
      state.cart = cart;
      localStorage.setItem('carts', JSON.stringify(cart));
      return { ...state };
    }

    case NUMBER_QUANTITY: {
      let { status, product } = payload;
      let cart = [...state.cart];
      const index = cart.findIndex((cart) => {
        return cart.id === product.id;
      });
      if (index !== -1) {
        if (status) {
          cart[index].quantity_cart += 1;
        } else {
          if (cart[index].quantity_cart > 1) {
            cart[index].quantity_cart -= 1;
          } else {
            Swal.fire('Max decline!', '', 'warning');
          }
        }
      }
      state.cart = cart;
      localStorage.setItem('carts', JSON.stringify(cart));
      return { ...state };
    }

    case START_LOADING: {
      state.isLoading = true;
      return { ...state };
    }

    case STOP_LOADING: {
      state.isLoading = false;
      return { ...state };
    }

    default:
      return state;
  }
};

export default defaultReducer;
