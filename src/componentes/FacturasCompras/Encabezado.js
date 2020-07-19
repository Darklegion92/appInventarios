import React, { useState, useRef } from "react";
import { Input, Col, Row } from "antd";
import InputText from "../InputText";
import InputNumber from "../InputNumber";
import ComboList from "../ComboList";

function Encabezado(props) {
  const {
    codigo,
    setCodigo,
    documento,
    setDocumento,
    nombre,
    numero,
    descripcion,
    setDescripcion,
    cantidad,
    setCantidad,
    traeProveedor,
    datosNombre,
    cargarProveedores,
    cargando,
    traerArticulo,
    datosDescripcion,
    cargarArticulos,
    setValorUni,
    valorUni,
    setValorTotal,
    valorTotal,
    asignarDocumento,
    guardarTabla,
    setNombre,
    asignarCodigo,
    setdisabledDescripcion,
    setdisabledCodigo,
    setdisabledDocumento,
    setdisabledCantidad,
    setdisabledValorUni,
    disabledDescripcion,
    disabledCodigo,
    disabledDocumento,
    disabledCantidad,
    disabledValorUni,
    disabledNombre,
    setdisabledNombre,
  } = props;

  const onChangeCodigo = (e) => {
    setCodigo(e.target.value.toUpperCase());
  };

  const onChangeDocumento = (e) => {
    if (e.target.value === "") {
      setdisabledNombre(false);
    }
    setDocumento(e.target.value.toUpperCase());
  };

  const onChangeDescripcion = (e) => {
    asignarCodigo(e.key);
    setDescripcion(e);
    setdisabledValorUni(false);
  };

  const onChangeCantidad = (e) => {
    setCantidad(e);
    if (e > 0 && valorUni > 0) {
      setValorTotal(e * valorUni);
    }
  };

  const onChangeValorUni = (e) => {
    setValorUni(e);
    setdisabledCantidad(false);
    if (cantidad > 0 && e > 0) {
      setValorTotal(cantidad * e);
    }
  };

  const onChangeNombre = (e) => {
    console.log(e);

    if (e.key) {
      asignarDocumento(e.key);
      traeProveedor(e.key);
      setNombre(e);
      setdisabledCodigo(false);
      setdisabledDescripcion(false);
    } else {
      setdisabledCodigo(false);
      setdisabledDescripcion(true);
    }
  };

  const onFocusNombre = (e) => {
    if (documento) {
      if (traeProveedor(documento)) {
        setdisabledNombre(true);
        setdisabledCodigo(false);
        setdisabledDescripcion(false);
      } else {
        setdisabledCodigo(false);
        setdisabledDescripcion(false);
      }
    } else {
      setdisabledNombre(false);
      setdisabledDocumento(true);
    }
  };

  const onSearchNombre = (e) => {
    cargarProveedores(e.toUpperCase());
  };

  const onSearchDescripcion = (e) => {
    cargarArticulos(e.toUpperCase());
  };

  const onFocusDescripcion = async (e) => {
    if (codigo) {
      const res = await traerArticulo(codigo);
      if (res === true) {
        setdisabledValorUni(false);
        setdisabledDescripcion(true);
      }
    } else {
      setdisabledDescripcion(false);
      setdisabledCodigo(true);
    }
  };
  const onBlurCantidad = (e) => {
    if (guardarTabla()) {
      nuevoarticulo();
    }
  };

  const onBlurCodigo = async () => {
    if (codigo) {
      const res = await traerArticulo(codigo);
      if (res === true) {
        setdisabledValorUni(false);
        setdisabledDescripcion(true);
      }
    } else {
      setdisabledDescripcion(false);
      setdisabledCodigo(true);
    }
  };

  const nuevoarticulo = () => {
    setdisabledDescripcion(false);
    setdisabledCodigo(false);
    setdisabledDocumento(true);
    setdisabledNombre(true);
    setdisabledCantidad(true);
    setCodigo("");
    setDescripcion([]);
    setCantidad(0);
    setValorTotal(0);
    setValorUni(0);
  };

  return (
    <div>
      <Input.Group>
        <Row gutter={10}>
          <Col span={3}>
            <InputText
              text="Número"
              value={numero + 1 || 1}
              size={{ width: "100%" }}
              disabled={true}
            />
          </Col>
          <Col span={4}>
            <InputText
              text="Documento"
              value={documento}
              onChange={onChangeDocumento}
              size={{ width: "100%" }}
              disabled={disabledDocumento}
            />
          </Col>
          <Col span={14}>
            <ComboList
              title="Nombre"
              size={{ width: "100%" }}
              disabled={disabledNombre}
              datos={datosNombre}
              onSearch={onSearchNombre}
              onChange={onChangeNombre}
              cargando={cargando}
              value={nombre}
              onFocus={onFocusNombre}
            />
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={3}>
            <InputText
              text="Código"
              onChange={onChangeCodigo}
              value={codigo}
              size={{ width: "100%" }}
              disabled={disabledCodigo}
              onBlur={onBlurCodigo}
            />
          </Col>
          <Col span={10}>
            <ComboList
              title="Decripción"
              size={{ width: "100%" }}
              disabled={disabledDescripcion}
              datos={datosDescripcion}
              onSearch={onSearchDescripcion}
              cargando={cargando}
              value={descripcion}
              onFocus={onFocusDescripcion}
              onChange={onChangeDescripcion}
            />
          </Col>
          <Col span={3}>
            <InputNumber
              onChange={onChangeValorUni}
              value={valorUni}
              text="Valor Un."
              size={{ width: "100%" }}
              disabled={disabledValorUni}
            />
          </Col>
          <Col span={3}>
            <InputNumber
              text="Cantidad"
              onChange={onChangeCantidad}
              value={cantidad}
              size={{ width: "100%" }}
              onBlur={onBlurCantidad}
              disabled={disabledCantidad}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              value={valorTotal}
              text="Total"
              size={{ width: "100%" }}
              disabled={true}
            />
          </Col>
        </Row>
      </Input.Group>
    </div>
  );
}
export default Encabezado;
