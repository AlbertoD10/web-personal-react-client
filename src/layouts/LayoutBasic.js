import React from "react";
import { Layout } from "antd";
import LoadRoutesLayout from "../router/LoadRoutesLayout";
import "./LayoutBasic.scss";
const { Content, Footer } = Layout;

export default function LayoutBasic(props) {
  const { routes } = props;

  return (
    <Layout>
      <h2>Menu header</h2>
      <Layout>
        <Content>
          <LoadRoutesLayout routes={routes} />
        </Content>
      </Layout>
    </Layout>
  );
}
