import React, { useState, useEffect } from "react";
import { Input, DatePicker, Switch } from "antd";
import locale from "antd/es/date-picker/locale/es_ES";

const FormularioTarifasIVA = (props) => {
  const { datos } = props;
  const [prefijo, setPrefijo] = useState();
  const [numero, setNumero] = useState();
  const [autorizacion, setAutorizacion] = useState();
  const [fechaautorizacion, setFechaautorizacion] = useState();
  const [fechavencimiento, setFechavencimiento] = useState();
  const [extension, setExtension] = useState();

  useEffect(() => {
    if (datos) {
      setPrefijo(datos.prefijo);
    }
  }, [datos.prefijo]);
  useEffect(() => {
    if (datos) {
      setNumero(datos.numero);
    }
  }, [datos.numero]);

  useEffect(() => {
    if (datos) {
      setAutorizacion(datos.autorizacion);
    }
  }, [datos.autorizacion]);

  useEffect(() => {
    if (datos) {
      setFechaautorizacion(datos.fechaautorizacion);
    }
  }, [datos.fechaautorizacion]);

  useEffect(() => {
    if (datos) {
      const date = new Date(datos.fechavencimiento);

      setFechavencimiento(datos.fechavencimiento);
    }
  }, [datos.fechavencimiento]);

  useEffect(() => {
    if (datos) {
      setExtension(datos.extension);
    }
  }, [datos.extension]);

  const onChangeNumero = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      datos.numero = value;
      setNumero(value);
    }
  };
  const onChangePrefijo = (e) => {
    const { value } = e.target;
    datos.prefijo = value.toUpperCase();
    setPrefijo(value.toUpperCase());
  };
  const onChangeAutorizacion = (e) => {
    const { value } = e.target;
    datos.autorizacion = value.toUpperCase();
    setAutorizacion(value.toUpperCase());
  };
  const onChangeFechaautorizacion = (date, datestring) => {
    datos.fechaautorizacion = datestring;
    setFechaautorizacion(datestring);
  };
  const onChangeFechavencimiento = (date, datestring) => {
    datos.fechavencimiento = datestring;
    setFechavencimiento(datestring);
  };
  const onChangeExtension = (value) => {
    datos.extension = value;
    setExtension(value);
  };
  return (
    <>
      <Input
        value={prefijo}
        placeholder="Prefijo"
        maxLength={5}
        onChange={onChangePrefijo}
      />
      <Input
        value={numero}
        placeholder="Número"
        maxLength={11}
        onChange={onChangeNumero}
      />
      <Input
        value={autorizacion}
        placeholder="Autorización de Facturacion"
        maxLength={50}
        onChange={onChangeAutorizacion}
      />
      <div>
        <DatePicker onChange={onChangeFechaautorizacion} locale={locale} />
      </div>
      <div>
        <DatePicker onChange={onChangeFechavencimiento} />
      </div>
      <Switch
        checkedChildren="Extensión"
        unCheckedChildren="Autorización"
        onChange={onChangeExtension}
        checked={extension}
      />
    </>
  );
};

export default FormularioTarifasIVA;
