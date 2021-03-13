import React from "react";
import { Row, Col } from "antd";
import LoadRoutesLayout from "../router/LoadRoutesLayout";
import "../components/Web/MenuTop";
import "./LayoutBasic.scss";
import MenuTop from "../components/Web/MenuTop";

export default function LayoutBasic(props) {
  const { routes } = props;

  return (
    <>
      <Row>
        <Col md={4} />
        <Col md={16}>
          <MenuTop />
        </Col>
      </Row>
      <Col md={4} />
      <LoadRoutesLayout routes={routes} />
    </>
  );

  // return (
  //   <Layout>
  //     <h2>Menu header</h2>
  //     <Layout>
  //       <Content>
  //         <LoadRoutesLayout routes={routes} />
  //       </Content>
  //     </Layout>
  //   </Layout>
  // );
}
