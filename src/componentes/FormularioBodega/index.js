import React from 'react'
import { Input } from 'antd'

import './styles.css'

const FormularioBodegas = props => {
  const { nombre, setNombre } = props

  const onChangeNombre = e => {
    const { value } = e.target
    setNombre(value)
  }
  return (
    <div className='formulario-grupos'>
      <Input
        value={nombre}
        placeholder='Nombre Bodega'
        maxLength={20}
        onChange={onChangeNombre}
      />
    </div>
  )
}

export default FormularioBodegas
