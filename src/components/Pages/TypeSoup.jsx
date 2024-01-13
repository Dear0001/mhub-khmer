import { Link } from "react-router-dom";
import { Container, Row, Col, Modal, Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import db from "../../Firebase/firebase";

const Appetizer = () => {
  const [soup, setSoup] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const soupCollection = collection(db, "soup");

      const unsubscribe = onSnapshot(soupCollection, (snapshot) => {
        setSoup(snapshot.docs.map((doc) => doc.data()));
      });
      return () => unsubscribe();
    };

    fetchData();
  }, []);

  const handleShow = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  const handleClose = () => setShow(false);
  return (
    <section className="section__appetizer">
      <Container className="pt-5 pb-5">
        <Link to="/mhub-khmer" className="contron__back">
          <span className="back__home mt-5">Back</span>
        </Link>
        <h1 className="text-center text-black m-4">SOUP</h1>
        <Row xs={1} sm={2} md={3} lg={6}>
          {soup.map((item, index) => (
            <Col key={index} className="mb-4" onClick={() => handleShow(item)}>
              <Card>
                <Card.Img
                  variant="top"
                  className="card-img img-fluid"
                  style={{ width: "100%", maxWidth: "100%" }}
                  src={item.image}
                  alt={item.title}
                />
                <Card.Body className="card-body">
                  <Card.Title className="card-title">{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* ///////////////////////////////////////////////// */}
        <div className="popup__detail">
          <Modal
            show={show}
            onHide={handleClose}
            dialogClassName="modal-fullscreen"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <h2>{selectedItem?.title}</h2>
                  <div>{selectedItem?.video}</div>
                  <Col md={6}>
                    <div className="controller_image">
                      <img
                        src={selectedItem?.image}
                        alt={selectedItem?.image}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div>
                      {selectedItem?.ingradients}
                      <div>{selectedItem?.value}</div>
                      <h3>How to do</h3>
                      <div>{selectedItem?.how_to_do}</div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </section>
  );
};

export default Appetizer;
