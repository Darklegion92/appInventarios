import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import axios from "axios";
import TablaParametros from "../Tabla";
import FormularioGrupos from "../FormularioGrupos";
import FormularioSubGrupos from "../FormularioSubGrupos";
import FormularioMarcas from "../FormularioMarcas";
import { API } from "../../config/keys";

import "./styles.css";
const { Title } = Typography;

export default function Parametros() {
  const [datosGrupo, setDatosGrupo] = useState();
  const [datosMarca, setDatosMarca] = useState();
  const [datosSubGrupo, setDatosSubGrupo] = useState();
  const [idGrupo, setIdGrupo] = useState(0);
  const [nombreGrupo, setNombreGrupo] = useState();
  const [idMarca, setIdMarca] = useState(0);
  const [nombreMarca, setNombreMarca] = useState();
  const [idSubGrupo, setIdSubGrupo] = useState(0);
  const [nombreSubGrupo, setNombreSubGrupo] = useState();

  const okGrupo = async (editar) => {
    try {
      if (editar) {
        const res = await axios.put(
          API + "agrupaciones/grupos",
          {
            idgrupo: idGrupo,
            nombre: nombreGrupo,
          },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
        if (res.status === 200) {
          setDatosGrupo(res.data);
        }
      } else {
        const res = await axios.post(
          API + "agrupaciones/grupos",
          {
            nombre: nombreGrupo,
          },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
        if (res.status === 200) {
          setDatosGrupo(res.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const okSubGrupo = async (editar) => {
    try {
      if (editar) {
        const res = await axios.put(
          API + "agrupaciones/subgrupos",
          {
            idsubgrupo: idSubGrupo,
            nombre: nombreSubGrupo,
            idgrupo: idGrupo,
          },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
        if (res.status === 200) {
          setDatosSubGrupo(res.data);
        }
      } else {
        const res = await axios.post(
          API + "agrupaciones/subgrupos",
          {
            nombre: nombreSubGrupo,
            idgrupo: idGrupo,
          },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
        if (res.status === 200) {
          setDatosSubGrupo(res.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const okMarca = async (editar) => {
    try {
      if (editar) {
        const res = await axios.put(
          API + "agrupaciones/marcas",
          {
            idmarca: idMarca,
            nombre: nombreMarca,
          },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
        if (res.status === 200) {
          setDatosMarca(res.data);
        }
      } else {
        const res = await axios.post(
          API + "agrupaciones/marcas",
          {
            nombre: nombreMarca,
          },
          {
            headers: {
              authorization: sessionStorage.getItem("Token"),
            },
          }
        );
        if (res.status === 200) {
          setDatosMarca(res.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const cargarGrupo = (record) => {
    setIdGrupo(record.idgrupo);
    setNombreGrupo(record.nombre);
  };

  const cargarSubGrupo = (record) => {
    setIdSubGrupo(record.idsubgrupo);
    setNombreSubGrupo(record.nombre);
  };

  const cargarMarca = (record) => {
    setIdMarca(record.idmarca);
    setNombreMarca(record.nombre);
  };

  const onClickGrupo = async (record) => {
    setIdGrupo(record.idgrupo);

    const subgrupos = await axios.get(
      API + "agrupaciones/subgrupos/" + record.idgrupo,
      {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      }
    );
    if (subgrupos.status === 200) {
      setDatosSubGrupo(subgrupos.data);
    } else {
      setDatosSubGrupo([]);
    }
  };

  const cargarDatos = async () => {
    try {
      const grupos = await axios.get(API + "agrupaciones/grupos", {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });
      if (grupos.status === 200) {
        setDatosGrupo(grupos.data);
      }
      const marcas = await axios.get(API + "agrupaciones/marcas", {
        headers: {
          authorization: sessionStorage.getItem("Token"),
        },
      });

      if (marcas.status === 200) {
        setDatosMarca(marcas.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const collistagrupos = [
    {
      title: "Código",
      dataIndex: "idgrupo",
      key: "idgrupo",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
  ];

  const collistasubgrupos = [
    {
      title: "Código",
      dataIndex: "idsubgrupo",
      key: "idsubgrupo",
    },
    ,
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Grupo",
      dataIndex: "nombregrupo",
      key: "nombregrupo",
    },
  ];

  const collistamarcas = [
    {
      title: "Código",
      dataIndex: "idmarca",
      key: "idmarca",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
  ];

  return (
    <div className="agrupaciones">
      <Title>AGRUPACIONES ARTÍCULOS</Title>
      <div className="dos">
        <TablaParametros
          titulo="GRUPOS INVENTARIO"
          datos={datosGrupo}
          columnas={collistagrupos}
          paginacion={5}
          onClick={onClickGrupo}
          okButton={okGrupo}
          edicion={cargarGrupo}
          Componente={
            <FormularioGrupos nombre={nombreGrupo} setNombre={setNombreGrupo} />
          }
        />
        <TablaParametros
          titulo="SUB GRUPO"
          datos={datosSubGrupo}
          columnas={collistasubgrupos}
          paginacion={5}
          okButton={okSubGrupo}
          edicion={cargarSubGrupo}
          Componente={
            <FormularioSubGrupos
              nombre={nombreSubGrupo}
              setNombre={setNombreSubGrupo}
              idGrupo={idGrupo}
            />
          }
        />
      </div>
      <TablaParametros
        titulo="MARCA"
        datos={datosMarca}
        columnas={collistamarcas}
        paginacion={15}
        okButton={okMarca}
        edicion={cargarMarca}
        Componente={
          <FormularioMarcas nombre={nombreMarca} setNombre={setNombreMarca} />
        }
      />
    </div>
  );
}
