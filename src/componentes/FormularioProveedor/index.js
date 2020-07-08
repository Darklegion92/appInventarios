import React, { useState, useEffect } from "react";
import Combo from "../Combo";
import InputNumber from "../InputNumber";
import InputText from "../InputText";

import "./styles.css";

function FormularioProveedor(props) {
  const { tiposDocumento, regimenes, setDatos, datos } = props;

  const [documento, setDocumento] = useState();
  const [idtipo_documento, setIdTipo_documento] = useState();
  const [razonsocial, setRazonSocial] = useState();
  const [nombres, setNombres] = useState();
  const [apellidos, setApellidos] = useState();
  const [direccion, setDireccion] = useState();
  const [telefono, setTelefono] = useState();
  const [correo, setCorreo] = useState();
  const [idregimen, setidRegimen] = useState();
  const [regimen, setRegimen] = useState({
    key: 0,
    value: "Seleccione...",
  });
  const [documentoTipo, setDocumentoTipo] = useState({
    key: 0,
    value: "",
  });
  let idproveedor;
  useEffect(() => {
    if (datos) {
      idproveedor = datos.idproveedor;
      setDocumento(datos.documento);
      setRazonSocial(datos.razonsocial);
      setNombres(datos.nombres);
      setTelefono(datos.telefono);
      setCorreo(datos.correo);
      setApellidos(datos.apellidos);
      setDireccion(datos.direccion);
      setidRegimen(datos.idregimen);
      setIdTipo_documento(datos.idtipo_documento);
      setDocumentoTipo({ key: datos.idtipo_documento, value: datos.prefijo });
      setRegimen({ key: datos.idregimen, value: datos.nombre });
    } else {
      idproveedor = "";
      setDocumento("");
      setRazonSocial("");
      setNombres("");
      setTelefono("");
      setCorreo("");
      setApellidos("");
      setDireccion("");
    }
  }, [datos]);

  useEffect(() => {
    setDatos({
      idproveedor,
      documento,
      idtipo_documento,
      razonsocial,
      nombres,
      apellidos,
      direccion,
      telefono,
      correo,
      idregimen,
    });
  }, [
    documento,
    idtipo_documento,
    razonsocial,
    nombres,
    apellidos,
    direccion,
    telefono,
    correo,
    idregimen,
  ]);
  const onChangeDocumento = (value) => {
    if (value) setDocumento(value);
  };

  const onChangeTipoDocumento = (value) => {
    setIdTipo_documento(value.key);
    setDocumentoTipo({ key: value.key, value: value.value });
  };

  const onChangeRazonSocial = (e) => {
    if (e) setRazonSocial(e.target.value);
  };

  const onChangeNombres = (e) => {
    if (e) setNombres(e.target.value);
  };

  const onChangeApellidos = (e) => {
    if (e) setApellidos(e.target.value);
  };

  const onChangeDireccion = (e) => {
    if (e) setDireccion(e.target.value);
  };

  const onChangeTelefono = (value) => {
    if (value) setTelefono(value);
  };

  const onChangeCorreo = (e) => {
    if (e) setCorreo(e.target.value);
  };
  const onChangeRegimen = (value) => {
    setidRegimen(value.key);
    setRegimen({ key: value.key, value: value.value });
  };

  return (
    <div className="from-proveedor">
      <div>
        <Combo
          titulo="Tipo"
          datos={tiposDocumento}
          size={{ width: 60 }}
          onChange={onChangeTipoDocumento}
          valor={documentoTipo}
        />
        <InputNumber
          text="Documento"
          size={{ width: 100 }}
          onChange={onChangeDocumento}
          value={documento}
        />
        <InputText
          text="Razón Social"
          size={{ width: 300 }}
          onChange={onChangeRazonSocial}
          value={razonsocial}
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
        <InputNumber
          text="Teléfono"
          size={{ width: 150 }}
          onChange={onChangeTelefono}
          value={telefono}
        />
      </div>
      <div>
        <InputText
          text="Correo Electrónico"
          size={{ width: 230 }}
          onChange={onChangeCorreo}
          value={correo}
        />
        <Combo
          titulo="Régimen"
          datos={regimenes}
          size={{ width: 230 }}
          onChange={onChangeRegimen}
          valor={regimen}
        />
      </div>
    </div>
  );
}

export default FormularioProveedor;
