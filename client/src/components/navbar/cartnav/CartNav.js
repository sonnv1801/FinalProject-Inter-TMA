import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import numeral from 'numeral';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  buyProduct,
  deleteCart,
  numberQuantity,
} from '../../../redux/actions/product.action';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CartNav(cart) {
  console.log('cart log', cart.cart.length);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.defaultReducer.login.currentUser);
  console.log(user);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const renderQuantity = () => {
    return cart.cart.reduce((sum, item) => {
      return (sum += item.quantity_cart);
    }, 0);
  };

  const renderAmount = () => {
    return cart.cart.reduce((total, item) => {
      return (total += item.newPrice * item.quantity_cart);
    }, 0);
  };

  const handleBuyNow = () => {
    if (user === null) {
      navigate('/login');
      setOpen(false);
    } else {
      dispatch(buyProduct());
    }
  };
  useEffect(() => {}, []);
  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{ margin: '0.5rem 0', background: 'none', color: 'black' }}
      >
        Giỏ Hàng {`(${renderQuantity()})`}
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={style}
          style={{
            width: '90%',
            height: 'auto',
            border: 'none',
            borderRadius: '5px',
            overflow: 'scroll',
            height: '500px',
          }}
          id="container-carts"
        >
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            style={{
              textAlign: 'center',
              color: 'red',
              textTransform: 'uppercase',
            }}
          >
            Giỏ Hàng Của Bạn!
          </Typography>
          {cart.cart.length === 0 ? (
            <div id="cart-empty">
              <img
                src="https://hoanghamobile.com/Content/web/content-icon/no-item.png"
                alt="..."
              />
              <b>Hiện chưa có sản phẩm nào</b>
            </div>
          ) : (
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              {cart.cart.map((item, index) => (
                <div className="row" id="cart-container">
                  <div className="col-2">
                    <div className="cart-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                  </div>
                  <div className="col-2">
                    <p>{item.title}</p>
                  </div>
                  <div className="col-2">
                    <div className="quantity-cart-nav">
                      <button
                        onClick={() => {
                          dispatch(numberQuantity(item, false));
                        }}
                      >
                        -
                      </button>
                      <input type="text" value={item.quantity_cart} />
                      <button
                        onClick={() => {
                          dispatch(numberQuantity(item, true));
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-2">
                    <p>{`${item.newPrice.toLocaleString()}đ`}</p>
                  </div>
                  <div className="col-2">
                    <p className="sum-carts">
                      {`${(
                        item.newPrice * item.quantity_cart
                      ).toLocaleString()}đ`}
                    </p>
                  </div>
                  <div className="col-2">
                    <span>
                      <DeleteIcon
                        onClick={() => {
                          dispatch(deleteCart(item));
                        }}
                      />
                    </span>
                  </div>
                </div>
              ))}
              <div className="row" id="sub-cart-nav">
                <div className="col-6">
                  <p></p>
                </div>
                <div className="col-6">
                  <p>
                    <span>Tổng Tiền:</span>
                    {`${renderAmount().toLocaleString()}đ`}
                  </p>
                  <p>
                    <button type="submit" id="btn-pay" onClick={handleBuyNow}>
                      Thanh Toán Ngay
                    </button>
                  </p>
                </div>
              </div>
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}
