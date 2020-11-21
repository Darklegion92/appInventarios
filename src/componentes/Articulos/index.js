import React, { useState, useEffect } from 'react'
import { Typography, Modal } from 'antd'
import axios from 'axios'
import { API } from '../../config/keys'
import Encabezado from './Encabezado'
import Pie from './Pie'
import Tabla from './Tabla'
import FormularioArticulo from '../FormularioArticulos'

import './styles.css'

const { Title } = Typography

function Articulos () {
  const [datos, setDatos] = useState()
  const [titulo, setTitulo] = useState()
  const [codigo, setCodigo] = useState()
  const [descripcion, setDescripcion] = useState()
  const [grupo, setGrupo] = useState()
  const [marca, setMarca] = useState()
  const [subgrupo, setSubgrupo] = useState()
  const [tarifa, setTarifa] = useState()
  const [estado, setEstado] = useState(false)
  const [valor, setValor] = useState(0)
  const [lista, setLista] = useState(0)
  const [datosGrupo, setDatosGrupo] = useState([])
  const [datosSubgrupo, setDatosSubgrupo] = useState([])
  const [datosMarca, setDatosMarca] = useState([])
  const [datosTarifa, setDatosTarifa] = useState([])
  const [datosListas, setDatosListas] = useState([])
  const [datosPrecios, setDatosPrecios] = useState([])
  const [idarticulo, setIdarticulo] = useState()
  const [modal, setModal] = useState(false)
  const [editarArticulo, setEditarArticulo] = useState(false)

  const cargarDatos = async () => {
    const resAticulos = await axios.get(API + 'articulos', {
      headers: {
        authorization: sessionStorage.getItem('Token')
      }
    })
    if (resAticulos.status === 200) {
      setDatos(resAticulos.data)
    }

    const resGrupos = await axios.get(API + 'agrupaciones/grupos', {
      headers: {
        authorization: sessionStorage.getItem('Token')
      }
    })

    if (resGrupos.status === 200) {
      let datos = []
      resGrupos.data.forEach(dato => {
        datos.push({ id: dato.idgrupo, dato: dato.nombre })
      })
      setDatosGrupo(datos)
    }
    const resMarcas = await axios.get(API + 'agrupaciones/marcas', {
      headers: {
        authorization: sessionStorage.getItem('Token')
      }
    })

    if (resMarcas.status === 200) {
      let datos = []
      resMarcas.data.forEach(dato => {
        datos.push({ id: dato.idmarca, dato: dato.nombre })
      })
      setDatosMarca(datos)
    }
    const resTarifa = await axios.get(API + 'parametros/tarifasiva', {
      headers: {
        authorization: sessionStorage.getItem('Token')
      }
    })

    if (resTarifa.status === 200) {
      let datos = []
      resTarifa.data.forEach(dato => {
        datos.push({ id: dato.idtarifaiva, dato: dato.nombre })
      })
      setDatosTarifa(datos)
    }
    const resListas = await axios.get(API + 'parametros/listasprecios', {
      headers: {
        authorization: sessionStorage.getItem('Token')
      }
    })

    if (resListas.status === 200) {
      setDatosListas(resListas.data)
    }
  }

  const handleOk = async editar => {
    if (editarArticulo) {
      const res = await axios.put(
        API + 'articulos',
        {
          descripcion: descripcion,
          codigo: codigo,
          idtarifaiva: tarifa.key,
          idgrupo: grupo.key,
          idsubgrupo: subgrupo.key,
          idmarca: marca.key,
          estado: estado,
          precios: datosPrecios,
          idarticulo: idarticulo
        },
        {
          headers: {
            authorization: sessionStorage.getItem('Token')
          }
        }
      )
      if (res.status === 200) {
        console.log(res.data)

        setDatos(res.data)
      }
    } else {
      const res = await axios.post(
        API + 'articulos',
        {
          descripcion: descripcion,
          codigo: codigo,
          idtarifaiva: tarifa.value,
          idgrupo: grupo.value,
          idsubgrupo: subgrupo.value,
          idmarca: marca.value,
          estado: estado,
          precios: datosPrecios
        },
        {
          headers: {
            authorization: sessionStorage.getItem('Token')
          }
        }
      )
      if (res.status === 200) {
        setDatos(res.data)
      }
    }
    setModal(false)
  }

  const editarPrecio = record => {
    setLista({
      value: record.nombre,
      label: record.nombre,
      key: record.idprecio
    })
    setValor(record.valor)
  }

  const okButtonPrecios = async editar => {
    if (editar) {
      let precios = []
      await datosPrecios.forEach(dato => {
        if (dato.nombre === lista.value) {
          precios.push({
            id: dato.idprecio,
            nombre: dato.nombre,
            valor: valor,
            editado: true
          })
        } else {
          precios.push(dato)
        }
      })
      setDatosPrecios(precios)
    } else {
      setDatosPrecios([
        ...datosPrecios,
        { id: lista.value, nombre: lista.label, valor: valor }
      ])
    }
  }

  const cargarPrecios = async id => {
    const res = await axios.get(API + 'articulos/precios/' + id, {
      headers: {
        authorization: sessionStorage.getItem('Token')
      }
    })

    if (res.status === 200) {
      setDatosPrecios(res.data)
    } else if (res.status === 201) {
      setDatosPrecios([])
    }
  }

  const cargarSubgrupos = async id => {
    const res = await axios.get(API + 'agrupaciones/subgrupos/' + id, {
      headers: {
        authorization: sessionStorage.getItem('Token')
      }
    })

    if (res.status === 200) {
      let datos = []
      res.data.forEach(dato => {
        datos.push({ id: dato.idsubgrupo, dato: dato.nombre })
      })
      setDatosSubgrupo(datos)
    } else if (res.status === 201) {
      setDatosSubgrupo([])
    }
  }

  const editar = record => {
    setTitulo('EDITAR ARTICULO')
    setCodigo(record.codigo)
    setDescripcion(record.descripcion)
    setGrupo({ key: record.idgrupo, value: record.nombregrupo })
    setSubgrupo({ key: record.idsubgrupo, value: record.nombresubgrupo })
    setMarca({ key: record.idmarca, value: record.nombremarca })
    setTarifa({ key: record.idtarifaiva, value: record.nombreTarifa })
    setEstado(record.estado)
    cargarSubgrupos(record.idgrupo)
    cargarPrecios(record.idarticulo)
    setIdarticulo(record.idarticulo)
    setEditarArticulo(true)
    setModal(true)
  }
  const handleCancel = () => {
    setModal(false)
  }

  const onClickCrear = () => {
    setTitulo('CREACIÓN ARTÍCULO')
    setEditarArticulo(false)
    setModal(true)
  }
  const onChangeSubgrupo = async e => {
    setSubgrupo(e)
  }
  const onChangeMarca = async e => {
    setMarca(e)
  }
  const onChangeTarifas = e => {
    setTarifa(e)
  }

  const onChangeEstado = async e => {
    setEstado(e)
  }

  const onChangeGrupo = async e => {
    setGrupo(e)
    cargarSubgrupos(e.value)
  }
  useEffect(() => {
    cargarDatos()
  }, [])
  return (
    <div className='articulos'>
      <Title>Artículos</Title>
      <div className='encabezado'>
        <Encabezado setDatosTabla={setDatos} />
      </div>
      <div className='cuerpo'>
        <Tabla datos={datos} onClick={editar} />
      </div>
      <div className='pie'>
        <Pie onClick={onClickCrear} />
      </div>
      <Modal
        title={titulo}
        visible={modal}
        centered
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormularioArticulo
          codigo={codigo}
          setCodigo={setCodigo}
          setDescripcion={setDescripcion}
          descripcion={descripcion}
          grupo={grupo}
          subgrupo={subgrupo}
          marca={marca}
          tarifa={tarifa}
          estado={estado}
          datosGrupo={datosGrupo}
          datosSubgrupo={datosSubgrupo}
          datosMarca={datosMarca}
          datosTarifa={datosTarifa}
          datosPrecios={datosPrecios}
          onChangeGrupo={onChangeGrupo}
          onChangeMarca={onChangeMarca}
          onChangeSubgrupo={onChangeSubgrupo}
          onChangeTarifas={onChangeTarifas}
          onChangeEstado={onChangeEstado}
          datosListas={datosListas}
          valor={valor}
          setValor={setValor}
          okButton={okButtonPrecios}
          setLista={setLista}
          lista={lista}
          editarPrecio={editarPrecio}
        />
      </Modal>
    </div>
  )
}
export default Articulos
