import React, { useRef } from "react";
import { Input, Col, Row, Typography, Select } from "antd";
import InputText from "../InputText";
import InputNumber from "../InputNumber";

const { Text } = Typography;

const { Option } = Select;
function Encabezado(props) {
  const {
    codigo,
    setCodigo,
    documento,
    setDocumento,
    nombre,
    numero,
    prefijo,
    descripcion,
    setDescripcion,
    cantidad,
    setCantidad,
    traerCliente,
    datosNombre,
    cargarClientes,
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
    disabledDescripcion,
    disabledCodigo,
    disabledDocumento,
    disabledCantidad,
    disabledNombre,
    setdisabledNombre,
    alertaError,
  } = props;

  const refCodigo = useRef(null);
  const refDocumento = useRef(null);
  const refNombres = useRef(null);
  const refDescripcion = useRef(null);
  const refCantidad = useRef(null);

  /*Funcional */
  const onPressEnterDocumento = async (e) => {
    const documento = e.target.value;
    if (documento) {
      const resp = await traerCliente(documento);
      if (resp) {
        setdisabledNombre(true);
        setdisabledCodigo(false);
        setdisabledDescripcion(false);
        refCodigo.current.select();
      } else {
        setdisabledCodigo(false);
        setdisabledDescripcion(false);
      }
    } else {
      setdisabledNombre(false);
      setdisabledDocumento(true);
      refNombres.current.focus();
    }
  };

  const onChangeNombre = (e) => {
    if (e.key) {
      asignarDocumento(e.key);
      traerCliente(e.key);
      setNombre(e);
      setdisabledCodigo(false);
      setdisabledDescripcion(false);
      refCodigo.current.select();
    } else {
      setdisabledCodigo(false);
      setdisabledDescripcion(true);
      refDocumento.current.select();
    }
  };

  const onSearchNombre = (e) => {
    cargarClientes(e.toUpperCase());
  };

  const onPressEnterCodigo = async (e) => {
    const codigo = e.target.value;
    if (codigo) {
      const res = await traerArticulo(codigo);
      if (res === true) {
        setdisabledDescripcion(true);
        setdisabledCantidad(false);
        refCantidad.current.select();
      }
    } else {
      setdisabledDescripcion(false);
      setdisabledCodigo(true);
      refDescripcion.current.focus();
    }
  };

  const onSearchDescripcion = (e) => {
    cargarArticulos(e.toUpperCase());
  };

  const onChangeDescripcion = (e) => {
    asignarCodigo(e.key);
    setDescripcion(e);
    refCantidad.current.select();
  };

  const onChangeValorUni = (e) => {
    console.log(e);
    setValorUni(e);
    setdisabledCantidad(false);
    setValorTotal(1 * e);
  };

  const onChangeCantidad = (e) => {
    const cant = e.target.value;
    setCantidad(cant);
    if (cant > 0 && valorUni > 0) {
      setValorTotal(cant * valorUni);
    } else {
      setValorTotal(0);
    }
  };

  const onPressEnterCantidad = (e) => {
    if (valorTotal > 0) {
      if (guardarTabla()) {
        refCodigo.current.select();
        nuevoarticulo();
        refCodigo.current.select();
      }
    } else {
      alertaError(
        "Cantidad o Precio Erroneos",
        "La Cantidad o El Precio No Pueden Ser 0"
      );
      setdisabledDescripcion(false);
      setdisabledCodigo(true);
    }
  };

  const nuevoarticulo = () => {
    setdisabledDescripcion(false);
    setdisabledCodigo(false);
    setdisabledDocumento(true);
    setdisabledNombre(true);
    setCodigo("");
    setDescripcion([]);
    setCantidad(1);
    setValorTotal(0);
    setValorUni(0);
    refCodigo.current.select();
  };

  const onChangeCodigo = (e) => {
    setCodigo(e.target.value);
  };

  return (
    <div>
      <Input.Group>
        <Row gutter={10}>
          <Col span={2}>
            <InputText
              text="Prefijo"
              value={prefijo}
              size={{ width: "100%" }}
              disabled={true}
            />
          </Col>
          <Col span={3}>
            <InputText
              text="Número"
              value={numero}
              size={{ width: "100%" }}
              disabled={true}
            />
          </Col>
          <Col span={4}>
            <Text>Documento</Text>
            <Input
              value={documento}
              disabled={disabledDocumento}
              onPressEnter={onPressEnterDocumento}
              placeholder="Documento"
              size="small"
              style={{ width: "100%" }}
              allowClear
              ref={refDocumento}
            />
          </Col>
          <Col span={14}>
            <Text>Nombre</Text>
            <Select
              disabled={disabledNombre}
              showSearch
              placeholder="Nombre"
              optionFilterProp="children"
              labelInValue={true}
              value={nombre}
              style={{ width: "100%" }}
              onChange={onChangeNombre}
              size="small"
              onSearch={onSearchNombre}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              ref={refNombres}
            >
              {datosNombre.map((dato) => {
                return <Option key={dato.id}>{dato.dato}</Option>;
              })}
            </Select>
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={3}>
            <Text>Código</Text>
            <Input
              value={codigo}
              onChange={onChangeCodigo}
              onPressEnter={onPressEnterCodigo}
              placeholder="Código"
              size="small"
              style={{ width: "100%" }}
              allowClear
              ref={refCodigo}
            />
          </Col>
          <Col span={10}>
            <Text>Decripción</Text>
            <Select
              disabled={disabledDescripcion}
              showSearch
              placeholder="Decripción"
              optionFilterProp="children"
              labelInValue={true}
              value={descripcion}
              style={{ width: "100%" }}
              onChange={onChangeDescripcion}
              size="small"
              onSearch={onSearchDescripcion}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              ref={refDescripcion}
            >
              {datosDescripcion.map((dato) => {
                return <Option key={dato.id}>{dato.dato}</Option>;
              })}
            </Select>
          </Col>
          <Col span={3}>
            <Text>Valor Un.</Text>
            <Input
              disabled={true}
              placeholder="Valor Un."
              size="small"
              style={{ width: "100%" }}
              value={valorUni}
              allowClear
              onChange={onChangeValorUni}
            />
          </Col>
          <Col span={3}>
            <Text>Cantidad</Text>
            <Input
              placeholder="Cantidad"
              value={cantidad}
              size="small"
              style={{ width: "100%" }}
              onChange={onChangeCantidad}
              onPressEnter={onPressEnterCantidad}
              allowClear
              ref={refCantidad}
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
