import React, { useEffect, useState } from 'react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import './style.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypeProduct } from '../../redux/actions/typeProduct.action';

export default function Menu(props) {
  const dispatch = useDispatch();
  const listType = useSelector((state) => state.defaultReducer.listType);
  useEffect(() => {
    dispatch(getAllTypeProduct());
  }, []);

  return (
    <div id="mainnav">
      <ul>
        {listType.map((item, index) => (
          <li className="thefirst" key={index}>
            <Link to={`/shop/${item.name}`}>
              {item.name} <ArrowForwardIosOutlinedIcon className="icon-menu" />
            </Link>
            {/* <ul className="sub-menu">
              {item.name === props.product.type
                ? props.product.map((prd) => <li>{prd.title}</li>)
                : props.product.map((prd) => <li>{prd.title}</li>)}
              <li>
                <Link to="/shop">Iphone 14</Link>
              </li>
            </ul> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
