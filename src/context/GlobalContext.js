import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../config/keys";
const GlobalContext = React.createContext({});
const { Provider, Consumer } = GlobalContext;

const GlobalProvider = ({ children }) => {
  const [entrada, setEntrada] = useState({ items: [], numero: 2 });
  const [usuario, setUsuario] = useState({ idsucursal: 1 });
  const [sucursales, setSucursales] = useState([]);
  const [bodegas, setBodegas] = useState([]);
  const [articulos, setArticulos] = useState([]);

  const cargarParametros = async () => {
    //cargar bodegas
    const token = localStorage.getItem("Token");
    const respBodegas = await axios.get(API + "parametros/bodegas", {
      headers: {
        authorization: token,
      },
      params: {
        idsucursal: usuario.idsucursal,
      },
    });
    if (respBodegas.status === 200) {
      setBodegas(respBodegas.data);
    }
  };
  const articulosDescripcion = async (desc) => {
    const datos = await axios.get(
      API + "articulos/filtro/descripcion/" + desc,
      {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      }
    );
    if (datos.status === 200) {
      setArticulos(datos.data);
    }
    return "ERROR";
  };

  const articulosCodigo = async (codigo) => {
    const datos = await axios.get(API + "articulos/codigo/" + codigo, {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    });
    if (datos.status === 200) {
      //setArticulos(datos.data)
      return datos.data[0];
    }
    return "ERROR";
  };

  const cargarParametrosIniciales = async () => {};

  const guardarEntrada = (datos, idBodega, observacion) => {
    console.log(datos);
    console.log(idBodega);
    console.log(observacion);
    return "error momentaneo";
  };
  useEffect(() => {
    cargarParametrosIniciales();
  }, []);

  return (
    <Provider
      value={{
        bodegas,
        entrada,
        articulosCodigo,
        articulos,
        cargarParametros,
        articulosCodigo,
        articulosDescripcion,
        guardarEntrada,
      }}
    >
      {children}
    </Provider>
  );
};

export { GlobalProvider, Consumer as GlobalConsumer, GlobalContext };
