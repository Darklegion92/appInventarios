import React, { useState, useEffect } from "react";
import Combo from "../Combo";
import InputText from "../InputText";

import "./styles.css";

function FormularioProveedor(props) {
  const { tiposDocumento, listasPrecios, setDatos, datos } = props;
  const [documento, setDocumento] = useState();
  const [nombres, setNombres] = useState();
  const [apellidos, setApellidos] = useState();
  const [direccion, setDireccion] = useState();
  const [telefono, setTelefono] = useState();
  const [idtipo_documento, setIdTipo_documento] = useState();
  const [idlistaprecios, setIdListaPrecios] = useState();
  const [documentoTipo, setDocumentoTipo] = useState({
    key: 0,
    value: "",
  });
  const [listaPrecios, setListaPrecios] = useState({
    key: 0,
    value: "",
  });

  let idcliente;
  useEffect(() => {
    if (datos) {
      idcliente = datos.idcliente;
      setDocumento(datos.documento);
      setNombres(datos.nombres);
      setTelefono(datos.telefono);
      setApellidos(datos.apellidos);
      setDireccion(datos.direccion);
      setIdTipo_documento(datos.idtipo_documento);
      setDocumentoTipo({ key: datos.idtipo_documento, value: datos.prefijo });
      setListaPrecios({ key: datos.idlistaprecios, value: datos.nombre });
    } else {
      idcliente = "";
      setDocumento("");
      setNombres("");
      setTelefono("");
      setApellidos("");
      setDireccion("");
    }
  }, [datos]);

  useEffect(() => {
    setDatos({
      idcliente,
      documento,
      idtipo_documento,
      nombres,
      apellidos,
      direccion,
      telefono,
      idlistaprecios,
    });
  }, [
    idcliente,
    documento,
    idtipo_documento,
    nombres,
    apellidos,
    direccion,
    telefono,
    idlistaprecios,
  ]);

  const onChangeDocumento = (e) => {
    if (e) setDocumento(e.target.value.toUpperCase());
  };

  const onChangeTipoDocumento = (value) => {
    setIdTipo_documento(value.key);
    setDocumentoTipo({ key: value.key, value: value.value });
  };

  const onChangeListaPrecios = (value) => {
    setIdListaPrecios(value.key);
    setListaPrecios({ key: value.key, value: value.value, label: value.label });
  };

  const onChangeNombres = (e) => {
    if (e) setNombres(e.target.value.toUpperCase());
  };

  const onChangeApellidos = (e) => {
    if (e) setApellidos(e.target.value.toUpperCase());
  };

  const onChangeDireccion = (e) => {
    if (e) setDireccion(e.target.value.toUpperCase());
  };

  const onChangeTelefono = (e) => {
    if (e) setTelefono(e.target.value);
  };

  return (
    <div className="from-proveedor">
      <div>
        <Combo
          titulo="Tipo"
          datos={tiposDocumento}
          size={{ width: 90 }}
          onChange={onChangeTipoDocumento}
          valor={documentoTipo}
        />
        <InputText
          text="Documento"
          size={{ width: 250 }}
          onChange={onChangeDocumento}
          value={documento}
        />
        <Combo
          titulo="Lista Precios"
          datos={listasPrecios}
          size={{ width: 120 }}
          onChange={onChangeListaPrecios}
          valor={listaPrecios}
        />
      </div>
      <div>
        <InputText
          text="Nombres"
          size={{ width: 230 }}
          onChange={onChangeNombres}
          value={nombres}
        />
        <InputText
          text="Apellidos"
          size={{ width: 230 }}
          onChange={onChangeApellidos}
          value={apellidos}
        />
      </div>
      <div>
        <InputText
          text="Dirección"
          size={{ width: 310 }}
          onChange={onChangeDireccion}
          value={direccion}
        />
        <InputText
          text="Teléfono"
          size={{ width: 150 }}
          onChange={onChangeTelefono}
          value={telefono}
        />
      </div>
    </div>
  );
}

export default FormularioProveedor;
