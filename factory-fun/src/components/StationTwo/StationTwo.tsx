// import React from 'react';
// import styles from './StationTwo.module.scss';

// import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import { factoryState } from '../../app/FactoryReducer';

// const StationTwo = () => {
//   const factoryStateSelector = useAppSelector(factoryState);

//   return (
//     <React.Fragment>
//       <div className={styles.header}>
//         <span className={styles.text}>Station 2</span>
//       </div>
//       <div className={styles.body}>
//         <span className={styles.text}>
//           {Object.keys(factoryStateSelector.stationTwo.order)
//             .length === 0
//             ? factoryStateSelector.stationTwo.status
//             : factoryStateSelector.stationTwo.order['guid']}{' '}
//         </span>
//       </div>
//     </React.Fragment>
//   );
// };

// export default StationTwo;

import React, { useState } from "react";
import { ListGroup, Modal, Button } from "react-bootstrap";
import styles from "./StationTwo.module.scss";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  clearStation,
  updateStationThree,
  factoryState,
} from "../../app/FactoryReducer";
import { updateOrders, ordersState, Order } from "../../app/OrdersReducer";

const StationTwo = () => {
  const factoryStateSelector = useAppSelector(factoryState);
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMoveToNextStation = () => {
    if (Object.keys(factoryStateSelector.stationThree.order).length === 0) {
      let modifiedOrder = JSON.parse(
        JSON.stringify(factoryStateSelector.stationTwo.order)
      );
      modifiedOrder.status = "completed";
      modifiedOrder.location = "Station 3";

      dispatch(clearStation("stationtwo"));
      dispatch(updateStationThree(modifiedOrder));
      dispatch(updateOrders(modifiedOrder));
    }

    handleClose();
  };

  const handleClick = () => {
    if (Object.keys(factoryStateSelector.stationTwo.order).length != 0) {
      handleShow();
    }
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <span className={styles.text}>Station 2</span>
      </div>
      <div className={styles.body} onClick={() => handleClick()}>
        <span className={styles.text}>
          {Object.keys(factoryStateSelector.stationTwo.order).length === 0
            ? factoryStateSelector.stationTwo.status
            : factoryStateSelector.stationTwo.order["guid"]}{" "}
        </span>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Station 2 Prompt</Modal.Title>
        </Modal.Header>
        <Modal.Body>Send order to Station 3?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleMoveToNextStation();
            }}
          >
            Move to Station 3
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

export default StationTwo;
