import React from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { API } from "../../config/keys";
import "./styles.css";

const { Title } = Typography;
const Login = (props) => {
  const { ingresar } = props;

  const onFinish = async (values) => {
    const res = await axios.post(API + "usuarios/login", { values });

    if (res.status === 200) ingresar(false);

    if (res.status === 201) console.log(res.data.mensaje);
    if (res.status === 501) console.log(res.data.mensaje);
  };

  return (
    <div className="form-login">
      <img src="img/logo.png" alt="imgLogo" />
      <Title level={2}>INGRESO USUARIO</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="usuario"
          rules={[
            {
              required: true,
              message: "Campo usuario no puede estar vacío",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Usuario"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Campo contraseña no puede estar vacío",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Contraseña"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Recordar</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            INGRESAR
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
