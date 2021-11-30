import React, { useState } from 'react';
import { ListGroup, Modal, Button } from 'react-bootstrap';
import styles from './Orders.module.scss';



const Orders = () => {
  const [show, setShow] = useState(false);
  const [orderGuid, setOrderGuid] = useState("empty");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOrderSubmission = (guid: string) => {
    setOrderGuid(guid);
    handleShow();
  }

  return (
  <React.Fragment>
    <div className={styles.header}><span className={styles.text}>Orders</span></div>
    <div className={styles.body}>
      <ListGroup as="ol">
      <ListGroup.Item action onClick={() => handleOrderSubmission("34f34f34f34")}
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">34f34f34f34</div>
          New
        </div>
      </ListGroup.Item>
      <ListGroup.Item action onClick={() => handleOrderSubmission("45h45h45h45h")}
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">45h45h45h45h</div>
          New
        </div>
      </ListGroup.Item>
    </ListGroup>,
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>Send order "{orderGuid}" to Station 1?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
  </React.Fragment>
  );
}

export default Orders;
