import React from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;
function FormularioUsuario({ datosUsuario, sucursales, onFinish, roles }) {
  return (
    <Form
      layout="vertical"
      style={{ width: "60%", margin: "auto" }}
      onFinish={onFinish}
      fields={
        datosUsuario
          ? [
              { name: "usuario", value: datosUsuario.usuario },
              { name: "nombre", value: datosUsuario.nombre },
              {
                name: "sucursal",
                value: datosUsuario.nombresucursal,
                key: datosUsuario.idsucursal,
               },
              {
                name: "rol",
                value: datosUsuario.nombrerol,
                key: datosUsuario.idrol,
              },
            ]
          : []
      }
    >
      <Form.Item
        name="usuario"
        label="Usuario"
        rules={[
          { required: true, message: "Campo usuario no puede estar vacío" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Contraseña"
        rules={[
          {
            required: datosUsuario ? false : true,
            message: "Campo contraseña no puede estar vacío",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="nombre"
        label="Nombre"
        rules={[
          { required: true, message: "Campo nombre no puede estar vacío" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sucursal"
        label="Sucursal"
        rules={[{ required: true, message: "Debe elegir una sucursal válida" }]}
      >
        <Select>
          {sucursales.map((sucursal) => {
            return <Option key={sucursal.id}>{sucursal.nombre}</Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="rol"
        label="Rol"
        rules={[{ required: true, message: "Debe elegir un rol válida" }]}
      >
        <Select>
          {roles.map((rol) => {
            return <Option key={rol.idrol}>{rol.nombre}</Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          GUARDAR
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormularioUsuario;
