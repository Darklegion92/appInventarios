import React, { useState, useEffect, useRef, useContext } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Typography, Col, Row } from 'antd'
import axios from 'axios'
import { Modal, Button } from 'antd'
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'
import Tabla from './Tabla'
import Encabezado from './Encabezado'
import FormatoFactura from './FormatoFactura'
import Pie from './Pie'
import { GlobalContext } from '../../context/GlobalContext'
import { API } from '../../config/keys'

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
    console.log(idBodega)
    const resp = await guardarEntrada(datosTabla, idBodega, observacion)
    if (resp) {
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
