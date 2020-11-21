import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API } from '../config/keys'
const GlobalContext = React.createContext({})
const { Provider, Consumer } = GlobalContext

const GlobalProvider = ({ children }) => {
  const [entrada, setEntrada] = useState({ items: [], numero: 2 })
  const [usuario, setUsuario] = useState()
  const [sucursales, setSucursales] = useState([])
  const [bodegas, setBodegas] = useState([])
  const [articulos, setArticulos] = useState([])
  const [seleccion, setSeleccion] = useState('Configuración-Usuarios')
  const [usuarios, setUsuarios] = useState([])

  const cargarParametros = async (token, usuario) => {
    //cargar bodegas
    const respBodegas = await axios.get(API + 'parametros/bodegas', {
      headers: {
        authorization: token
      },
      params: {
        idsucursal: usuario.idsucursal
      }
    })
    if (respBodegas.status === 200) {
      setBodegas(respBodegas.data)
    }
    const datos = await axios.get(API + 'parametros/sucursales')
    setSucursales(datos.data)
    constultarUsuarios()
  }

  const constultarUsuarios = async () => {
    const datos = await axios.get(API + 'lista', {
      headers: {
        authorization: sessionStorage.getItem('Token')
      }
    })
    if (datos.status === 200) {
      setUsuarios(datos.data)
    }
    return 'ERROR'
  }

  const articulosDescripcion = async desc => {
    const datos = await axios.get(
      API + 'articulos/filtro/descripcion/' + desc,
      {
        headers: {
          authorization: sessionStorage.getItem('Token')
        }
      }
    )
    if (datos.status === 200) {
      setArticulos(datos.data)
    }
    return 'ERROR'
  }

  const articulosCodigo = async codigo => {
    const datos = await axios.get(API + 'articulos/codigo/' + codigo, {
      headers: {
        authorization: sessionStorage.getItem('Token')
      }
    })
    if (datos.status === 200) {
      //setArticulos(datos.data)
      return datos.data[0]
    }
    return 'ERROR'
  }

  const login = async values => {
    const res = await axios.post(API + 'ingresar', { values })

    if (res.status === 200) {
      localStorage.setItem('Nombre', res.data.usuario.asignacion)
      if (values.remember) {
        localStorage.setItem('Token', res.data.token)
        sessionStorage.setItem('Token', res.data.token)
      } else sessionStorage.setItem('Token', res.data.token)
      setUsuario(res.data.usuario)
      cargarParametros(res.data.token, res.data.usuario)
    }

    if (res.status === 201) console.log(res.data.mensaje)
    if (res.status === 501) console.log(res.data.mensaje)
  }

  const cargarParametrosIniciales = async () => {
    const token = localStorage.getItem('Token')
    try {
      const isAuth = await axios.get(API + 'validar', {
        headers: {
          authorization: token
        }
      })

      if (isAuth.status === 200) {
        setUsuario(isAuth.data)
        cargarParametros(token, isAuth.data)
      } else {
        setUsuario()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const guardarEntrada = (datos, idBodega, observacion) => {
    console.log(datos)
    console.log(idBodega)
    console.log(observacion)
    return 'error momentaneo'
  }
  useEffect(() => {
    cargarParametrosIniciales()
  }, [])

  return (
    <Provider
      value={{
        bodegas,
        entrada,
        articulosCodigo,
        articulos,
        setSeleccion,
        seleccion,
        login,
        usuario,
        usuarios,
        sucursales,
        articulosDescripcion,
        guardarEntrada
      }}
    >
      {children}
    </Provider>
  )
}

export { GlobalProvider, Consumer as GlobalConsumer, GlobalContext }
