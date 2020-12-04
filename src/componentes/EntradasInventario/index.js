import React, { useState, useContext } from 'react'
import { Typography, Col, Row } from 'antd'

import { message } from 'antd'
import Tabla from './Tabla'
import Encabezado from './Encabezado'

import Pie from './Pie'
import { GlobalContext } from '../../context/GlobalContext'

import './styles.css'
const { Title } = Typography

function FacturasVentas () {
  const {
    bodegas,
    cargarParametros,
    articulos,
    articulosCodigo,
    articulosDescripcion,
    guardarEntrada
  } = useContext(GlobalContext)
  const [datosTabla, setDatoTabla] = useState([])
  const [idBodega, setIdBodega] = useState()
  const [bodegaEstado, setBodegaEstado] = useState(false)

  const agregarDatos = (datos, idbodega) => {
    console.log(datos)
    setIdBodega(idbodega)
    setDatoTabla([
      ...datosTabla,
      {
        codigoarticulo: datos.codigo,
        descripcionarticulo: datos.artDescripcion,
        cantidadarticulo: datos.cantidad,
        valorarticulo: datos.precio,
        valortotal: datos.precio * datos.cantidad
      }
    ])
    return true
  }

  const buscarArticulo = dato => {
    articulosDescripcion(dato)
  }

  const onClick = async observacion => {
    const resp = await guardarEntrada(datosTabla, idBodega, observacion)
    if (resp) {
      message.success('Entrada Guardada Correctamente')
      limpiarCampos()
    } else {
      console.log(resp)
    }
  }
  const limpiarCampos = () => {
    setDatoTabla([])
    setBodegaEstado(false)
  }
  return (
    <Row justify='center' gutter={[0, 18]}>
      <Col span={20}>
        <Row justify='center'>
          <Title>Entradas Inventarios</Title>
        </Row>
        <Encabezado
          bodegas={bodegas}
          articulos={articulos}
          articulosCodigo={articulosCodigo}
          agregarDatos={agregarDatos}
          buscarArticulo={buscarArticulo}
          bodegaEstado={bodegaEstado}
          setBodegaEstado={setBodegaEstado}
        />
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Tabla datos={datosTabla} />
          </Col>
        </Row>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Pie
              datosEntrada={datosTabla}
              setOnClick={onClick}
              limpiarCampos={limpiarCampos}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default FacturasVentas
