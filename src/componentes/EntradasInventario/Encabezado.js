import React, { useState, useRef } from 'react'
import { Input, Col, Row, Form, Select } from 'antd'

const { Option } = Select
const { Item } = Form

function Encabezado ({ prefijoEntrada, numeroEntrada, bodegas }) {
  return (
    <Form name='basic' layout='vertical'>
      <Row align='middle' justify='center' gutter={16}>
        <Col span={3}>
          <Item label='Bodega' name='bodega'>
            <Select>
              <Option>Bodega 1</Option>
              <Option>Bodega 2</Option>
            </Select>
          </Item>
        </Col>
        <Col span={2}>
          <Item label='Código' name='codigo'>
            <Input />
          </Item>
        </Col>
        <Col span={10}>
          <Item label='Nombre' name='nombre'>
            <Input />
          </Item>
        </Col>
        <Col span={3}>
          <Item label='Precio Unt' name='precioUnt'>
            <Input />
          </Item>
        </Col>
        <Col span={3}>
          <Item label='Cantidad' name='cantidad'>
            <Input />
          </Item>
        </Col>
        <Col span={3}>
          <Item label='Total' name='total'>
            <Input disabled />
          </Item>
        </Col>
      </Row>
    </Form>
  )
}
export default Encabezado
