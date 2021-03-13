import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import react from "../../../assets/img/react.png";
import node from "../../../assets/img/nodejs.png";
import express from "../../../assets/img/express.png";
import mongo from "../../../assets/img/mongo.png";

import "./HomeStack.scss";

export default function HomeStack() {
  return (
    <Row className="home-courses">
      <Col lg={24} className="home-courses__title">
        <h2>Las tecnologias utilizadas en esta web fueron: </h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-courses">
          <Col md={6}>
            <CardCourse
              image={mongo}
              title="MongoDB"
              subtitle="Base de datos no relacional"
              link="https://www.mongodb.com/"
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={react}
              title="React"
              subtitle="Una biblioteca de JavaScript para construir interfaces de usuario"
              link="https://reactjs.org/"
            />
          </Col>
          <Col md={6}>
            <CardCourse
              image={node}
              title="Node.js"
              subtitle="Entorno de ejecución de Javascript"
              link="https://nodejs.org/"
            />
          </Col>

          <Col md={6}>
            <CardCourse
              image={express}
              title="Express.js"
              subtitle="Framework rápido, minimalista y flexible para Node.js"
              link="https://expressjs.com/"
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
      <Col lg={24} className="home-courses__more">
        <Link to="/courses">
          <Button>Ver más</Button>
        </Link>
      </Col>
    </Row>
  );
}

function CardCourse(props) {
  const { image, title, subtitle, link } = props;
  const { Meta } = Card;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card
        className="home-courses__card"
        cover={<img src={image} alt={title} />}
        actions={[<Button>Página</Button>]}
      >
        <Meta title={title} description={subtitle} />
      </Card>
    </a>
  );
}
