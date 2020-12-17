import React, { useState, useEffect } from 'react'
import { Input, Select, Typography } from 'antd'

import './styles.css'

const { Option } = Select
const { Text } = Typography
const FormularioBodegas = props => {
  const { setDatos, datos, sucursales } = props
  const [bodega, setBodega] = useState()

  useEffect(() => {
    setBodega(datos.nombre)
  }, [datos])

  const onChangeNombre = e => {
    setBodega(e.target.value)
    let data = datos
    data.nombre = e.target.value
    setDatos(data)
  }

  const onChangeSucursal = e => {
    let data = datos
    data.idsucursal = e
    setDatos(data)
  }
  return (
    <div className='formulario-grupos'>
      <Text>Bodega</Text>
      <Input
        value={bodega}
        placeholder='Nombre Bodega'
        maxLength={20}
        onChange={onChangeNombre}
      />
      <Text>Sucursal</Text>
      <Select
        value={datos.nombresucursal}
        style={{ width: '100%' }}
        onChange={onChangeSucursal}
      >
        {sucursales &&
          sucursales.map(sucursal => {
            return <Option key={sucursal.id}>{sucursal.nombre}</Option>
          })}
      </Select>
    </div>
  )
}

export default FormularioBodegas
