import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

const Footprints = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "#f4f4f9" }}>
      <div className="container-fluid text-center">
        <h6 style={{ color: "#7b1fa2" }}>Excellence in Metalwork</h6>
        <h2 className="fw-bold" style={{ color: "#4a148c" }}>
          Our Footprints in Metal Fabrication
        </h2>
        <div className="row justify-content-center mt-5">
          {/* Circle elements */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div
              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto"
              style={{
                width: "150px",
                height: "150px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1) rotate(5deg)";
                e.target.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1) rotate(0deg)";
                e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div>
                <h3 className="fw-bold mb-0">20+</h3>
                <p className="mb-0">Years of Experience</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div
              className="rounded-circle bg-info text-white d-flex justify-content-center align-items-center mx-auto"
              style={{
                width: "150px",
                height: "150px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1) rotate(5deg)";
                e.target.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1) rotate(0deg)";
                e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div>
                <h3 className="fw-bold mb-0">1000+</h3>
                <p className="mb-0">Projects Completed</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div
              className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center mx-auto"
              style={{
                width: "150px",
                height: "150px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1) rotate(5deg)";
                e.target.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1) rotate(0deg)";
                e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div>
                <h3 className="fw-bold mb-0">500+</h3>
                <p className="mb-0">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5" style={{ color: "#4a148c" }}>
          <em>
            "Crafting metal with passion and precision." <br />
            - Jayalath Iron Works
          </em>
        </p>
      </div>
    </section>
  );
};

export default Footprints;
