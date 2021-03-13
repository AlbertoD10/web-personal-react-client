import { Col, Row } from "antd";
import React from "react";

import "./MainBanner.scss";

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="main-banner_dark" />

      <Row>
        <Col md={4} />
        <Col md={16}>
          <h2>
            Bienvenidos, <br />
          </h2>
          <h3>Proyecto creado utilizando el stack MERN</h3>
        </Col>
        <Col md={4} />
      </Row>
    </div>
  );
}
