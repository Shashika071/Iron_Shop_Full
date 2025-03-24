import './ShopItems.css'; // Import custom CSS for additional styling

import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaCogs, FaHammer, FaTools, FaTruck, FaWarehouse, FaWrench } from 'react-icons/fa';

import React from 'react';
import { assest } from '../../assest/assest';

const ShopItems = () => {
  // Updated data for Jayalath Iron Works
  const shops = [
    {
      name: 'Jayalath Iron Works',
      image: assest.s1,
      description: 'Expertly crafted iron and metalwork solutions.',
      products: [
        'Custom Gates & Grills',
        'Metal Fabrication & Welding',
        'Iron Furniture & Fixtures',
        'Industrial Metal Supplies',
        'Decorative Ironworks',
        'Repair & Maintenance Services'
      ],
      link: 'https://example.com/jayalath-iron-works'
    },
    {
      name: 'Industrial Metal Supply',
      image: assest.s2,
      description: 'Quality metal supplies for all your construction needs.',
      products: ['Steel Rods', 'Aluminum Sheets', 'Metal Pipes'],
      link: 'https://example.com/metal-supply'
    },
    {
      name: 'Custom Iron Design',
      image: assest.s3,
      description: 'Bespoke iron designs crafted to perfection.',
      products: ['Decorative Railings', 'Metal Sculptures', 'Custom Gates'],
      link: 'https://example.com/custom-iron'
    },
    {
      name: 'Welding Solutions',
      image: assest.s4,
      description: 'Professional welding and repair services.',
      products: ['Welding Repairs', 'Custom Fabrication', 'On-site Welding'],
      link: 'https://example.com/welding-solutions'
    },
    {
      name: 'Iron Fittings & Accessories',
      image: assest.s5,
      description: 'Wide range of iron fittings and accessories.',
      products: ['Bolts & Nuts', 'Hinges', 'Brackets'],
      link: 'https://example.com/iron-fittings'
    },
    {
      name: 'Metal Art & Sculptures',
      image: assest.s6, // Make sure to add this image in your assets folder
      description: 'Unique metal art pieces and custom sculptures.',
      products: ['Metal Wall Art', 'Garden Sculptures', 'Custom Designs'],
      link: 'https://example.com/metal-art'
    }
  ];
  

  // New services section for Jayalath Iron Works
  const services = [
    {
      icon: <FaHammer />,
      title: 'Custom Metal Fabrication',
      description: 'Tailor-made metal solutions to fit your requirements.'
    },
    {
      icon: <FaTools />,
      title: 'Welding Services',
      description: 'Professional welding for repairs and custom projects.'
    },
    {
      icon: <FaWarehouse />,
      title: 'Metal Supply',
      description: 'High-quality metal supplies for all construction needs.'
    },
    {
      icon: <FaTruck />,
      title: 'Delivery Services',
      description: 'Timely delivery of metal products to your location.'
    },
    {
      icon: <FaWrench />,
      title: 'Maintenance & Repair',
      description: 'Expert maintenance and repair for iron structures.'
    },
    {
      icon: <FaCogs />,
      title: 'Industrial Solutions',
      description: 'Comprehensive solutions for industrial metal needs.'
    }
  ];

  return (
    <div id='about'  className="shop-container mt-5">
      <h2 className="text-center mb-5 shop-header">Explore Jayalath Iron Works</h2>
      <Row className="shop-items-row">
        {shops.map((shop, index) => (
          <Col md={3} sm={6} xs={12} key={index} className="mb-4">
            <Card className="shop-card shadow-lg">
              <Card.Img variant="top" src={shop.image} alt={shop.name} className="shop-image" />
              <Card.Body>
                <Card.Title className="shop-title">{shop.name}</Card.Title>
                <Card.Text className="shop-description">{shop.description}</Card.Text>
                <ul className="shop-products">
                  {shop.products.map((product, i) => (
                    <li key={i} className="product-item">{product}</li>
                  ))}
                </ul>
              </Card.Body>
              <Card.Footer>
                <Button  variant="primary" className="visit-btn" href={shop.link} target="_blank">
                  Visit Shop
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
<div id='services'></div>
    
      <h2  className="text-center my-5 shop-header">Our Services</h2>
      <Row  className="services-row">
        {services.map((service, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-4">
            <Card   className="service-card shadow-sm text-center">
              <Card.Body>
                <div className="service-icon mb-3">{service.icon}</div>
                <Card.Title className="service-title">{service.title}</Card.Title>
                <Card.Text className="service-description">{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ShopItems;
