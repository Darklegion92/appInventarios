import React, { useState } from 'react'
import { Typography, Button, Row, Col, Input } from 'antd'

const { Text } = Typography
const { TextArea } = Input
const styleTextos = {
  fontSize: '20px'
}
function Pie ({ datosEntrada }) {
  return (
    <Row align='middle' justify='center' gutter={10}>
      <Col span={8}>
        <Row gutter={16} align='middle' justify='center'>
          <Col span={16}>
            <Text style={styleTextos} strong>
              Cantidad Items:
            </Text>
          </Col>
          <Col span={8}>
            <Text style={styleTextos} strong>
              {datosEntrada.length}
            </Text>
          </Col>
        </Row>
        <Row gutter={16} align='middle' justify='center'>
          <Col span={16}>
            <Text style={styleTextos} strong>
              Total Entrada:
            </Text>
          </Col>
          <Col span={8}>
            <Text style={styleTextos} strong>
              {datosEntrada.length}
            </Text>
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <img src='img/logo.png' alt='logo' />
      </Col>
      <Col span={4}>
        <Row>
          <Text>Observación:</Text>
        </Row>
        <Row>
          <TextArea />
        </Row>
      </Col>
      <Col span={4}>
        <Row gutter={10} align='top' justify='center'>
          <Button type='primary' shape='round'>
            GUARDAR
          </Button>
        </Row>
        <Row gutter={10} align='bottom' justify='center'>
          <Button type='primary' shape='round' danger style={{marginTop:"10px"}}>
            CANCELAR
          </Button>
        </Row>
      </Col>
    </Row>
    /* <>
      <div>
        <div>
          <Text>Cantidad Items:</Text>
          <Text>{cantidadItems}</Text>
        </div>
        <div>
          <Text>Total Factura:</Text>
          <Text>{valorTotal}</Text>
        </div>
        <div>
          <Text>Total IVA:</Text>
          <Text>{totalIva}</Text>
        </div>
      </div>
      <div>
        <img src="img/logo.png" alt="logo" />
      </div>
      <div>
        <InputNumber
          onChange={onChangeRecibido}
          value={recibido}
          text="Recibido"
          size={{ width: "100%" }}
          disabled={false}
        />
        <div>
          <Text>Cambio</Text>
          <Text>{cambio}</Text>
        </div>
      </div>
      <div>
        <Button type="primary" shape="round" onClick={onClickok}>
          GUARDAR
        </Button>
        <Button type="primary" shape="round" danger onClick={onClickCancel}>
          CANCELAR
        </Button>
      </div>
    </R>*/
  )
}

export default Pie
