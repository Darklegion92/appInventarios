import React, { useState, useEffect } from 'react'
import { Typography, Table, Button, Modal } from 'antd'
import { FileOutlined } from '@ant-design/icons'
import axios from 'axios'

import Encabezado from './Encabezado'
import FormularioCliente from '../FormularioCliente'
import { API } from '../../config/keys'
import './styles.css'
const { Title } = Typography

export default function Proveedores () {
  const [titulo, setTitulo] = useState('NUEVO PROVEEDOR')
  const [modal, setModal] = useState(false)
  const [tiposDocumento, setTiposDocumento] = useState()
  const [listasPrecios, setListasPrecios] = useState()
  const [datosEnvio, setDatosEnvio] = useState()
  const [datosEditar, setDatosEditar] = useState()
  const [datosTabla, setDatosTabla] = useState()
  const [editar, setEditar] = useState(false)

  const cargarDatos = async () => {
    try {
      const datosTipoDocumento = await axios.get(
        API + 'parametros/tiposdocumento',
        {
          headers: {
            authorization: sessionStorage.getItem('Token')
          }
        }
      )
      if (datosTipoDocumento.status === 200) {
        let datos = []
        datosTipoDocumento.data.map(dato => {
          datos.push({ id: dato.idtipo_documento, dato: dato.prefijo })
        })

        setTiposDocumento(datos)
      }

      const datosListaPrecios = await axios.get(
        API + 'parametros/listasprecios',
        {
          headers: {
            authorization: sessionStorage.getItem('Token')
          }
        }
      )
      if (datosListaPrecios.status === 200) {
        let datos = []
        datosListaPrecios.data.map(dato => {
          datos.push({ id: dato.idlistaprecios, dato: dato.nombre })
        })
        setListasPrecios(datos)
      }
      const datosClientes = await axios.get(API + 'clientes/', {
        headers: {
          authorization: sessionStorage.getItem('Token')
        }
      })
      if (datosClientes.status === 200) {
        setDatosTabla(datosClientes.data)
      }
    } catch (e) {
      localStorage.clear()
      sessionStorage.clear()
    }
  }

  useEffect(() => {
    cargarDatos()
  }, [datosEnvio])

  const onClickNuevo = e => {
    setTitulo('NUEVO CLIENTE')
    setDatosEnvio({})
    setDatosEditar({})
    setEditar(false)
    setModal(true)
  }
  const handleOk = async e => {
    if (editar) {
      datosEnvio.idcliente = datosEditar.idcliente
      console.log(datosEditar)
      const res = await axios.put(API + 'clientes/editar', datosEnvio, {
        headers: {
          authorization: sessionStorage.getItem('Token')
        }
      })
      if (res.status === 200) {
        cargarDatos()
        setDatosTabla(res.data)
      }
    } else {
      const res = await axios.post(
        API + 'clientes/crear',
        {
          idtipo_documento: datosEnvio.idtipo_documento,
          documento: datosEnvio.documento,
          nombres: datosEnvio.nombres,
          apellidos: datosEnvio.apellidos,
          direccion: datosEnvio.direccion,
          telefono: datosEnvio.telefono,
          idlistaprecios: datosEnvio.idlistaprecios
        },
        {
          headers: {
            authorization: sessionStorage.getItem('Token')
          }
        }
      )
      if (res.status === 200) {
        cargarDatos()
        setDatosTabla(res.data)
        setDatosEditar([])
      }
    }

    setModal(false)
  }
  const handleCancel = e => {
    setModal(false)
  }
  const columns = [
    {
      title: 'Documento',
      dataIndex: 'documento',
      key: 'documento'
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres'
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos'
    },
    {
      title: 'Dirección',
      dataIndex: 'direccion',
      key: 'direccion'
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'telefono'
    },
    {
      title: 'Lista Precios',
      dataIndex: 'nombre',
      key: 'nombre'
    }
  ]

  return (
    <div className='clientes'>
      <Title>Clientes</Title>
      <div className='encabezado'>
        <Encabezado setDatosTabla={setDatosTabla} />
      </div>
      <div className='cuerpo'>
        <Table
          dataSource={datosTabla}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setTitulo('EDITAR CLIENTE')
                setDatosEditar(record)
                setEditar(true)
                setModal(true)
              }, // click row
              onDoubleClick: event => {}, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {} // mouse leave row
            }
          }}
        />
      </div>
      <div className='pie'>
        <Button
          type='primary'
          shape='round'
          icon={<FileOutlined />}
          size={'large'}
          onClick={onClickNuevo}
        >
          NUEVO
        </Button>
      </div>
      <Modal
        title={titulo}
        visible={modal}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ width: 1000 }}
      >
        <FormularioCliente
          tiposDocumento={tiposDocumento}
          listasPrecios={listasPrecios}
          setDatos={setDatosEnvio}
          datos={datosEditar}
        />
      </Modal>
    </div>
  )
}
