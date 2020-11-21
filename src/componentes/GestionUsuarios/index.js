import React, { useContext } from 'react'
import { Row, Col, Typography, Table, Button, Space, Modal } from 'antd'
import { GlobalContext } from '../../context/GlobalContext'
import FormularioUsuario from './FormularioUsuario'

const { Title, Text } = Typography

const cols = [
  {
    title: 'Código',
    dataIndex: 'idusuario',
    key: 'idusuario'
  },
  {
    title: 'Usuario',
    dataIndex: 'usuario',
    key: 'usuario'
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre'
  },
  {
    title: 'Sucursal',
    dataIndex: 'nombresucursal',
    key: 'nombresucursal'
  }
]

function GestionUsuarios () {
  const { usuarios } = useContext(GlobalContext)

  return (
    <Col style={{ marginTop: '25px' }}>
      <Space direction='vertical' size={30} style={{ width: '100%' }}>
        <Row justify='center'>
          <Title align='center'>GESTIÓN DE USUARIOS</Title>
        </Row>
        <Row justify='center'>
          <Table
            columns={cols}
            style={{ width: '70%' }}
            dataSource={usuarios}
          />
        </Row>
        <Row justify='center'>
          <Text style={{ color: 'red', textAlign: 'left', width: '70%' }}>
            *Para editar el usuario presione doble click
          </Text>
        </Row>
        <Row justify='center'>
          <Button type='primary'>NUEVO</Button>
        </Row>
      </Space>
      <Modal footer={null} visible={true} title='GUARDAR USUARIO'>
        <FormularioUsuario />
      </Modal>
    </Col>
  )
}

export default GestionUsuarios
