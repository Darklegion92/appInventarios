import React, { useState } from 'react'
import axios from 'axios'

const GlobalContext = React.createContext({})
const { Provider, Consumer } = GlobalContext

const GlobalProvider = ({ children }) => {
  const [numeroEntrada, setNumeroEntrada] = useState(2)
  const [datosEntrada, setDatosEntrada] = useState([])

  return <Provider value={{ numeroEntrada, datosEntrada  }}>{children}</Provider>
}

export { GlobalProvider, Consumer as GlobalConsumer, GlobalContext }
