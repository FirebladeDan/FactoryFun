// import React from 'react';
// import styles from './StationThree.module.scss';

// const StationThree = () => (
//   <React.Fragment>
//     <div className={styles.header}>
//       <span className={styles.text}>Station 3</span>
//     </div>
//     <div className={styles.body}></div>
//   </React.Fragment>
// );

// export default StationThree;

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
import styles from "./StationThree.module.scss";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  clearStation,
  updateDeliveryTruck,
  factoryState,
} from "../../app/FactoryReducer";
import { updateOrders, ordersState, Order } from "../../app/OrdersReducer";

const StationThree = () => {
  const factoryStateSelector = useAppSelector(factoryState);
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMoveToNextStation = () => {
    let modifiedOrder = JSON.parse(
      JSON.stringify(factoryStateSelector.stationThree.order)
    );
    modifiedOrder.status = "shipped";
    modifiedOrder.location = "Delivery Truck";

    dispatch(clearStation("stationthree"));
    dispatch(updateDeliveryTruck(modifiedOrder));
    dispatch(updateOrders(modifiedOrder));

    handleClose();
  };

  const handleClick = () => {
    if (Object.keys(factoryStateSelector.stationThree.order).length != 0) {
      handleShow();
    }
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <span className={styles.text}>Station 3</span>
      </div>
      <div className={styles.body} onClick={() => handleClick()}>
        <span className={styles.text}>
          {Object.keys(factoryStateSelector.stationThree.order).length === 0
            ? factoryStateSelector.stationThree.status
            : factoryStateSelector.stationThree.order["guid"]}{" "}
        </span>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Station 3 Prompt</Modal.Title>
        </Modal.Header>
        <Modal.Body>Send order to Delivery Truck?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleMoveToNextStation();
            }}
          >
            Yes
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

export default StationThree;
