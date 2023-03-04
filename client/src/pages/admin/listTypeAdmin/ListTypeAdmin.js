import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import {
  addType,
  deleteType,
  getAllTypeProduct,
} from '../../../redux/actions/typeProduct.action';
import './style.css';
import Sidebar from '../sidebaradmin/Sidebar';
function ListTypeAdmin() {
  const [showadd, setShowadd] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('token'));
  const [name, setName] = useState('');
  const isLoading = useSelector((state) => state.defaultReducer.isLoading);
  // const [data, setData] = useState({
  //   name: '',
  // });

  const dispatch = useDispatch();
  const listTypeAdmin = useSelector((state) => state.defaultReducer.listType);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newType = {
      name: name,
    };
    dispatch(addType(newType, currentUser?.accessToken));
    setShowadd(false);
    console.log('newType', newType);
  };
  const handleCloseAdd = () => {
    setShowadd(false);
  };
  useEffect(() => {
    dispatch(getAllTypeProduct());
  }, []);

  return (
    <div className="container-listtypeAd">
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-9">
          <div className="title-list">
            <div className="row">
              <div className="col-sm-5">
                <p>Type Management</p>
              </div>
              <div className="col-sm-7">
                <button
                  href="#"
                  class="btn btn-outline-danger"
                  onClick={() => {
                    setShowadd(true);
                  }}
                >
                  <i class="bx bxs-folder-plus"></i>
                  <span>Add Type</span>
                </button>
              </div>
            </div>
          </div>
          <table className="table">
            <thead classNane="table-dark">
              <tr>
                <th>STT</th>
                <th>Type name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <div
                  class="spinner-border"
                  role="status"
                  style={{ margin: '0 auto' }}
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  {listTypeAdmin.map((type, index) => (
                    <tr>
                      <td>{index}</td>

                      <td>{type.name}</td>

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            dispatch(
                              deleteType(type._id, currentUser?.accessToken)
                            );
                          }}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showadd} onHide={handleCloseAdd} className="modal">
        <ModalHeader>
          <ModalTitle>Thêm Type</ModalTitle>
        </ModalHeader>
        <ModalBody className="modal-body">
          <Form.Group className="formgroup-body">
            <Form.Label>Tên Type: </Form.Label>
            <Form.Control
              type="text"
              // onChange={handleChange('name')}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập Type..."
            />
          </Form.Group>
        </ModalBody>
        <ModalFooter>
          <Button variant="success" onClick={handleSubmit}>
            Thêm Loại
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ListTypeAdmin;
