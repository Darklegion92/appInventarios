import React, { useContext, useState } from 'react'
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
  const { usuarios, sucursales, registrarUsuario } = useContext(GlobalContext)
  const [usuario, setUsuario] = useState(null)
  const [modal, setModal] = useState({ visible: false })

  const onFinish = async values => {
    const resp = await registrarUsuario(values, usuario)
    if (resp === true) {
      setModal({ visible: false })
    }
  }

  const onClick = () => {
    setUsuario(null)
    setModal({ titulo: 'CREAR USUARIO', visible: true })
  }
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
            onRow={(record, rowIndex) => {
              return {
                onDoubleClick: event => {
                  setUsuario(record)
                  setModal({
                    titulo: 'ACTUALIZAR USUARIO "' + record.usuario + '"',
                    visible: true
                  })
                }
              }
            }}
          />
        </Row>
        <Row justify='center'>
          <Text style={{ color: 'red', textAlign: 'left', width: '70%' }}>
            *Para editar el usuario presione doble click
          </Text>
        </Row>
        <Row justify='center'>
          <Button type='primary' onClick={onClick}>
            NUEVO
          </Button>
        </Row>
      </Space>
      <Modal footer={null} visible={modal.visible} title={modal.titulo}>
        <FormularioUsuario
          sucursales={sucursales}
          onFinish={onFinish}
          datosUsuario={usuario}
        />
      </Modal>
    </Col>
  )
}

export default GestionUsuarios
