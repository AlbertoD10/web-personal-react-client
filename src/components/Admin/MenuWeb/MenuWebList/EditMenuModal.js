import React, { useState } from "react";
import { Modal, Input, Form, Button, notification } from "antd";
import { basePath } from "../../../../api/config";
import { getAccessTokenApi } from "../../../../api/auth";
import { updateMenuApi } from "../../../../api/menu";

export default function EditMenuModal(props) {
  const {
    setShowEditModal,
    showEditModal,
    editModalContent,
    setRealoadMenu,
  } = props;
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const token = getAccessTokenApi();
    if (!formData.title && !formData.url) {
      notification["error"]({ message: "Los campos están vacios" });
    } else {
      updateMenuApi(token, editModalContent, formData).then((result) => {
        if (result.status) {
          notification["success"]({ message: result.message });
          form.resetFields();
          setRealoadMenu(true);
          setShowEditModal(false);
        } else {
          notification["error"]({ message: result.message });
        }
      });
    }
  };

  return (
    <Modal
      title="Editar menu"
      centered
      visible={showEditModal}
      onCancel={() => setShowEditModal(false)}
      footer={null}
    >
      <Form onFinish={onSubmit} onChange={(e) => onChange(e)} form={form}>
        <Form.Item label="Titulo" name="titleForm" value={formData.title}>
          <Input placeholder="Nombre del menu" name="title" />
        </Form.Item>
        <Form.Item label="URL" name="urlForm" value={formData.url}>
          <Input addonBefore={basePath} name="url" placeholder="/ejemplo.com" />
        </Form.Item>
        <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
          Guardar cambios
        </Button>
      </Form>
    </Modal>
  );
}
