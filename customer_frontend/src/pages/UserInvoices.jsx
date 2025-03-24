import { Alert, Button, Card, Container, Spinner, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { jsPDF } from 'jspdf';

const UserInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/quotation/get_invoice', {
          headers: {
            token,
          },
        });

        if (response.data.success) {
          const categorizedInvoices = response.data.invoices.reduce((acc, invoice) => {
            if (!acc[invoice.invoice_id]) {
              acc[invoice.invoice_id] = {
                ...invoice,
                items: [],
              };
            }
            acc[invoice.invoice_id].items = invoice.items;
            return acc;
          }, {});

          setInvoices(Object.values(categorizedInvoices));
        } else {
          setError('Failed to fetch invoices');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching invoices');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const downloadInvoice = (invoice) => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    doc.text('LuxeVista Resort', 10, 10);
    doc.text('123 Beachside Ave, Paradise City', 10, 20);
    doc.text('Phone: +123 456 7890', 10, 30);
    doc.text('---------------------------------', 10, 40);

    doc.text(`Invoice ID: ${invoice.invoice_id}`, 10, 50);
    doc.text(`Date: ${new Date(invoice.created_at).toLocaleDateString()}`, 10, 60);
    doc.text('---------------------------------', 10, 70);

    doc.text('Items:', 10, 80);
    let yPosition = 90;
    invoice.items.forEach((item, index) => {
      doc.text(`${item.material_name}`, 10, yPosition);
      doc.text(`Qty: ${item.quantity}`, 80, yPosition);
      doc.text(`$${item.unit_price}`, 130, yPosition);
      yPosition += 10;
    });

    doc.text('---------------------------------', 10, yPosition);
    yPosition += 10;
    doc.text(`Total Amount: $${invoice.total_amount}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Paid Amount: $${invoice.paid_amount}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Payment Status: ${invoice.payment_status}`, 10, yPosition);
    yPosition += 20;

    doc.text('Thank you for your purchase!', 10, yPosition);

    doc.save(`Invoice_${invoice.invoice_id}.pdf`);
  };

  if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Your Invoices</h2>
      {invoices.length === 0 ? (
        <Alert variant="info">No invoices found.</Alert>
      ) : (
        invoices.map((invoice) => (
<Card className="mb-3 shadow-sm bill-card mx-auto" style={{ maxWidth: '80%' }} key={invoice.invoice_id}>
<Card.Body>
              <h5 className="text-center">LuxeVista Resort</h5>
              <p className="text-center">123 Beachside Ave, Paradise City</p>
              <p className="text-center">Phone: +123 456 7890</p>
              <hr />
              <p><strong>Invoice ID:</strong> {invoice.invoice_id}</p>
              <p><strong>Date:</strong> {new Date(invoice.created_at).toLocaleDateString()}</p>
              <hr />
              <Table size="sm" bordered>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.material_name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.unit_price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <hr />
              <p><strong>Total Amount:</strong> ${invoice.total_amount}</p>
              <p><strong>Paid Amount:</strong> ${invoice.paid_amount}</p>
              <p><strong>Payment Status:</strong> {invoice.payment_status}</p>
              <hr />
              <p className="text-center">Thank you for your purchase!</p>
              <Button variant="primary" size="sm" className="mt-2 w-100" onClick={() => downloadInvoice(invoice)}>
                Download Invoice
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default UserInvoices;
