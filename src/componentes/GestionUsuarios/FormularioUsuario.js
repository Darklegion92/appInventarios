import React from 'react'
import { Form, Input, Select, Button } from 'antd'

const { Option } = Select
function FormularioUsuario ({ datosUsuario, sucursales }) {
  return (
    <Form layout='vertical' style={{ width: '60%', margin: 'auto' }}>
      <Form.Item
        name='usuario'
        label='Usuario'
        rules={[
          { required: true, message: 'Campo usuario no puede estar vacío' }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='password'
        label='Contraseña'
        rules={[
          { required: true, message: 'Campo contraseña no puede estar vacío' }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='nombre'
        label='Nombre'
        rules={[
          { required: true, message: 'Campo nombre no puede estar vacío' }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='sucursal'
        label='Sucursal'
        rules={[{ required: true, message: 'Debe elegir una sucursal válida' }]}
      >
        <Select />
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit' type='primary'>
          GUARDAR
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormularioUsuario
