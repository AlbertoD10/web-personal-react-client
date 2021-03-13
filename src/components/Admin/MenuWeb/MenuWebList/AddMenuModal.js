import React, { useState } from "react";
import { Modal, Input, Form, Button, notification } from "antd";
import { basePath } from "../../../../api/config";
import { getAccessTokenApi } from "../../../../api/auth";
import { addMenuApi } from "../../../../api/menu";

export default function AddMenuModal(props) {
  const { showModal, setShowModal, setRealoadMenu } = props;
  const [form] = Form.useForm();

  const [menuData, setMenuData] = useState({
    title: "",
    url: "",
    active: true,
    order: "0",
  });

  const onChange = (e) => {
    setMenuData({ ...menuData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    let menu = menuData;
    const token = getAccessTokenApi();

    addMenuApi(token, menu).then((result) => {
      if (result.status) {
        notification["success"]({ message: result.message });
        form.resetFields();
        setShowModal(false);
      } else {
        notification["error"]({ message: result.message });
      }
      setRealoadMenu(true);
    });
  };

  return (
    <Modal
      title="Crear nuevo menu"
      centered
      visible={showModal}
      onCancel={() => setShowModal(false)}
      footer={null}
    >
      <Form onFinish={onSubmit} onChange={onChange} form={form}>
        <Form.Item
          label="Titulo"
          name="titleForm"
          rules={[{ required: true, message: "Ingrese el nombre del menu" }]}
          value={menuData.title}
        >
          <Input placeholder="Nombre del menu" name="title" />
        </Form.Item>
        <Form.Item
          label="URL"
          name="urlForm"
          rules={[{ required: true, message: "Ingrese la url del menu" }]}
          value={menuData.url}
        >
          <Input addonBefore={basePath} name="url" placeholder="/ejemplo.com" />
        </Form.Item>
        <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
          Crear menu
        </Button>
      </Form>
    </Modal>
  );
}
