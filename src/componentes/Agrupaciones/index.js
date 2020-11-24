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
  const [grupo, setGrupo] = useState({});
  const [subGrupo, setSubGrupo] = useState({});
  const [marca, setMarca] = useState({});

  const okGrupo = async (editar) => {
    try {
      if (editar) {
        const res = await axios.put(
          API + "agrupaciones/grupos",
          {
            idgrupo: grupo.idgrupo,
            nombre: grupo.nombre,
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
            nombre: grupo.nombre,
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
            idsubgrupo: subGrupo.idsubgrupo,
            nombre: subGrupo.nombre,
            idgrupo: grupo.idgrupo,
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
            nombre: grupo.nombre,
            idgrupo: grupo.idgrupo,
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
            idmarca: marca.idmarca,
            nombre: marca.nombre,
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
            nombre: marca.nombre,
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
    setGrupo(record);
  };

  const cargarSubGrupo = (record) => {
    setSubGrupo(record);
  };

  const cargarMarca = (record) => {
    setMarca(record);
  };

  const onClickGrupo = async (record) => {
    const grup = grupo;
    grup.idgrupo = record.idgrupo;
    setGrupo(grup);

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
          setBodega={setGrupo}
          Componente={<FormularioGrupos datos={grupo} setDatos={setGrupo} />}
        />
        <TablaParametros
          titulo="SUB GRUPO"
          datos={datosSubGrupo}
          columnas={collistasubgrupos}
          paginacion={5}
          okButton={okSubGrupo}
          edicion={cargarSubGrupo}
          setBodega={setSubGrupo}
          Componente={
            <FormularioSubGrupos
              datos={subGrupo}
              setDatos={setSubGrupo}
              grupos={datosGrupo}
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
        Componente={<FormularioMarcas datos={marca} setDatos={setMarca} />}
      />
    </div>
  );
}
