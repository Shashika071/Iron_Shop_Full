import './Quotations.css'

import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

// Bootstrap components

const Quotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotations = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:4000/api/quotation/get', {
          method: 'GET',
          headers: {
            token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch quotations');
        }

        const data = await response.json();
        setQuotations(data.quotations || []);
      } catch (err) {
        setError('Error fetching quotations');
        console.error(err);
      }
    };

    fetchQuotations();
  }, []);

  const handleCreateQuotation = async () => {
    if (!jobDescription) {
      setError('Job description is required');
      return;
    }

    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:4000/api/quotation/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          job_description: jobDescription,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setJobDescription('');
        setLoading(false);
        setQuotations((prev) => [
          ...prev,
          { job_description: jobDescription, status: 'Pending', quotation_amount: 0.00 },
        ]);
      } else {
        setError(data.message || 'Error creating quotation');
      }
    } catch (err) {
      setError('Error creating quotation');
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="quotations-container">
      <h2>Jobs</h2>

      {/* Form for creating a new quotation */}
      <div className="quotation-form-container mb-3">
        <h3>Create New Job</h3>
        <Form>
          <Form.Group controlId="jobDescription">
            <Form.Control
              type="text"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter job description"
            />
          </Form.Group>
          <Button onClick={handleCreateQuotation} disabled={loading} variant="primary">
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Creating...
              </>
            ) : (
              'Create Quotation'
            )}
          </Button>
        </Form>
      </div>

      {/* Error message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Display list of quotations in a table */}
      {quotations.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Job Description</th>
              <th>Status</th>
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.job_description}</td>
                <td>{item.status}</td>
                <td>{item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No quotations found.</p>
      )}
    </div>
  );
};

export default Quotations;
