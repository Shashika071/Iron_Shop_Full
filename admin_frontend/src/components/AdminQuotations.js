import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

const AdminQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentQuotation, setCurrentQuotation] = useState(null);
  const [invoiceItems, setInvoiceItems] = useState([{ material_name: '', quantity: 1, unit_price: 0 }]);
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    const fetchQuotations = async () => {
      const response = await fetch('http://localhost:4000/api/quotation/admin');
      const data = await response.json();
      if (data.success) {
        setQuotations(data.quotations);
      }
    };

    fetchQuotations();
  }, []);

  const handleUpdateClick = (quotation) => {
    setCurrentQuotation(quotation);
    setShowModal(true);
    setInvoiceItems([{ material_name: '', quantity: 1, unit_price: 0 }]);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleMaterialChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...invoiceItems];
    updatedItems[index][name] = value;
    setInvoiceItems(updatedItems);
  };

  const addMaterial = () => {
    setInvoiceItems([...invoiceItems, { material_name: '', quantity: 1, unit_price: 0 }]);
  };

  const calculateTotalAmount = () => {
    return invoiceItems.reduce((total, item) => total + (item.quantity * item.unit_price), 0);
  };

  const handleSubmit = async () => {
    // Update the quotation status
    await fetch('http://localhost:4000/api/quotation/status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, quotationId: currentQuotation.id }),
    });

    // If status is not rejected, create the invoice
    if (status !== 'Rejected') {
      const response = await fetch('http://localhost:4000/api/quotation/invoice_create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quotationId: currentQuotation.id,
          invoiceAmount: calculateTotalAmount(),
          materials: invoiceItems,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Quotation updated and invoice created!');
        handleCloseModal();
      } else {
        alert('Error creating invoice');
      }
    } else {
      alert('Quotation status updated!');
      handleCloseModal();
    }
  };

  return (
    <div>
      <h2>All Quotations</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Job Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation) => (
            <tr key={quotation.id}>
              <td>{quotation.customer_name}</td>
              <td>{quotation.job_description}</td>
              <td>{quotation.status}</td>
              <td>
                <Button variant="primary" onClick={() => handleUpdateClick(quotation)}>
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Quotation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Form.Control>
            </Form.Group>

            {status !== 'Rejected' && (
              <>
                <h4>Invoice Materials</h4>
                {invoiceItems.map((material, index) => (
                  <div key={index}>
                    <Row>
                      <Col>
                        <Form.Group controlId={`materialName${index}`}>
                          <Form.Label>Material Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="material_name"
                            value={material.material_name}
                            onChange={(e) => handleMaterialChange(index, e)}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group controlId={`materialQuantity${index}`}>
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            type="number"
                            name="quantity"
                            value={material.quantity}
                            onChange={(e) => handleMaterialChange(index, e)}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group controlId={`materialUnitPrice${index}`}>
                          <Form.Label>Unit Price</Form.Label>
                          <Form.Control
                            type="number"
                            name="unit_price"
                            value={material.unit_price}
                            onChange={(e) => handleMaterialChange(index, e)}
                          />
                        </Form.Group>
                      </Col>

                      <Col xs="auto" className="d-flex align-items-end">
                        <Button variant="danger" onClick={() => setInvoiceItems(invoiceItems.filter((_, i) => i !== index))}>
                          Remove Material
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                  </div>
                ))}
                <Button variant="primary" onClick={addMaterial}>
                  Add Material
                </Button>

                <h5>Total Amount: ${calculateTotalAmount().toFixed(2)}</h5>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {status === 'Rejected' ? 'Update Status' : 'Save Changes and Create Invoice'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminQuotations;
