import React, { useState, useEffect } from 'react'
import { Typography } from 'antd'
import axios from 'axios'
import TablaParametros from '../Tabla'
import FormularioBodegas from '../FormularioBodega'
import { API } from '../../config/keys'

import './styles.css'
const { Title } = Typography

export default function Parametros () {
  const [datosBodega, setDatosBodega] = useState()
  const [idBodega, setIdBodega] = useState(0)
  const [nombreBodega, setNombreBodega] = useState()

  const okBodega = async editar => {
    try {
      if (editar) {
        const res = await axios.put(
          API + 'parametros/bodegas',
          {
            id: idBodega,
            nombre: nombreBodega
          },
          {
            headers: {
              authorization: sessionStorage.getItem('Token')
            }
          }
        )
        if (res.status === 200) {
          setDatosBodega(res.data)
        }
      } else {
        const res = await axios.post(
          API + 'parametros/bodegas',
          {
            nombre: nombreBodega
          },
          {
            headers: {
              authorization: sessionStorage.getItem('Token')
            }
          }
        )
        if (res.status === 200) {
          setDatosBodega(res.data)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  const cargarBodega = record => {
    setIdBodega(record.id)
    setNombreBodega(record.nombre)
  }

  const cargarDatos = async () => {
    try {
      const grupos = await axios.get(API + 'parametros/bodegas', {
        headers: {
          authorization: sessionStorage.getItem('Token')
        }
      })
      if (grupos.status === 200) {
        setDatosBodega(grupos.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  const collistabodegas = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre'
    }
  ]

  return (
    <div className='agrupaciones'>
      <Title>AGRUPACIONES ARTÍCULOS</Title>
      <div className='dos'>
        <TablaParametros
          titulo='BODEGAS'
          datos={datosBodega}
          columnas={collistabodegas}
          paginacion={5}
          okButton={okBodega}
          edicion={cargarBodega}
          Componente={
            <FormularioBodegas
              nombre={nombreBodega}
              setNombre={setNombreBodega}
            />
          }
        />
      </div>
    </div>
  )
}
