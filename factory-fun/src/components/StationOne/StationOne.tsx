import React, { useState } from "react";
import { ListGroup, Modal, Button } from "react-bootstrap";
import styles from "./StationOne.module.scss";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  clearStation,
  updateStationTwo,
  factoryState,
} from "../../app/FactoryReducer";
import { updateOrders, ordersState, Order } from "../../app/OrdersReducer";

const StationOne = () => {
  const factoryStateSelector = useAppSelector(factoryState);
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMoveToNextStation = () => {
    if (Object.keys(factoryStateSelector.stationTwo.order).length === 0) {
      let modifiedOrder = JSON.parse(
        JSON.stringify(factoryStateSelector.stationOne.order)
      );
      modifiedOrder.status = "in progress";
      modifiedOrder.location = "Station 2";

      dispatch(clearStation("stationone"));
      dispatch(updateStationTwo(modifiedOrder));
      dispatch(updateOrders(modifiedOrder));
    }

    handleClose();
  };

  const handleClick = () => {
    if (Object.keys(factoryStateSelector.stationOne.order).length != 0) {
      handleShow();
    }
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <span className={styles.text}>Station 1</span>
      </div>
      <div className={styles.body} onClick={() => handleClick()}>
        <span className={styles.text}>
          {Object.keys(factoryStateSelector.stationOne.order).length === 0
            ? factoryStateSelector.stationOne.status
            : factoryStateSelector.stationOne.order["guid"]}{" "}
        </span>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Station 1 Prompt</Modal.Title>
        </Modal.Header>
        <Modal.Body>Send order to Station 2?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleMoveToNextStation();
            }}
          >
            Move to Station 2
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Set Status to Blocked
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default StationOne;
