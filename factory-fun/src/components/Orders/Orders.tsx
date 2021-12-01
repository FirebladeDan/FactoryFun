import React, { useState } from 'react';
import { ListGroup, Modal, Button } from 'react-bootstrap';
import styles from './Orders.module.scss';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  updateStationOne,
  factoryState,
} from '../../app/FactoryReducer';
import {
  updateOrders,
  ordersState,
  Order,
} from '../../app/OrdersReducer';

const Orders = () => {
  const factoryStateSelector = useAppSelector(factoryState);
  const ordersStateSelector = useAppSelector(ordersState);

  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showOops, setShowOops] = useState(false);
  const handleOopsClose = () => setShowOops(false);
  const handleOopsShow = () => setShowOops(true);

  const [orderObject, setOrderObject] = useState({
    guid: '',
    status: '',
    location: '',
    createdAt: 0,
    modifiedAt: 0,
  });

  const handleOrderRowClick = (order: Order) => {
    if (
      Object.keys(factoryStateSelector.stationOne.order).length != 0
    ) {
      handleOopsShow();
    } else if (order.location != 'queue') {
      handleOopsShow();
    } else {
      setOrderObject(order);
      handleShow();
    }
  };

  const handleCreateVehicle = (order: Order) => {
    let modifiedOrder = JSON.parse(JSON.stringify(order));
    modifiedOrder.status = 'in progress';
    modifiedOrder.location = 'Station 1';

    dispatch(updateStationOne(modifiedOrder));
    dispatch(updateOrders(modifiedOrder));
    handleClose();
  };

  const generateListGroupItems = () => {
    return ordersStateSelector.orders.map((order) => (
      <ListGroup.Item
        action
        onClick={() => handleOrderRowClick(order)}
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">{order.guid}</div>
          <div>
            Created: '{new Date(order.createdAt * 1000).toISOString()}
            '
          </div>
          <div>Status: '{order.status}'</div>
          <div>Location: '{order.location}'</div>
        </div>
      </ListGroup.Item>
    ));
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <span className={styles.text}>Orders</span>
      </div>
      <div className={styles.body}>
        <ListGroup as="ol">{generateListGroupItems()}</ListGroup>,
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Send order "{orderObject.guid}" to <b>Station 1</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => handleCreateVehicle(orderObject)}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showOops} onHide={handleOopsClose}>
        <Modal.Header closeButton>
          <Modal.Title>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Station 1 is currently occupied OR you attempted to create a
          vehicle that is already in progress. Aborting Vehicle
          Creation.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleOopsClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Orders;
