import React, { useState, useRef, useEffect } from "react";
import { Input, Col, Row, Form, Select, Modal, Typography } from "antd";

const { Text } = Typography;
const { Option } = Select;
const { Item } = Form;

function Encabezado({
  bodegas,
  articulos,
  articulosCodigo,
  agregarDatos,
  buscarArticulo,
  bodegaEstado,
  setBodegaEstado,
}) {
  const [idbodega, setIdBodega] = useState(0);
  const [codigo, setCodigo] = useState();
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [cambiar, setCambiar] = useState(false);
  const [cargandoParams, setCargandoParams] = useState(true);
  const [artDescripcion, setArtDescripcion] = useState();
  const [codigoEstado, setCodigoEstado] = useState(true);
  const [descripcionEstado, setDescripcionEstado] = useState(true);
  const [precioEstado, setPrecioEstado] = useState(true);
  const [cantidadEstado, setCantidadEstado] = useState(true);
  const [totalArticulo, settotalArticulo] = useState(0);
  const [descripcionSelect, setDescripcionSelect] = useState({});
  const refDescripcion = useRef(null);
  const refCodigo = useRef(null);
  const refCantidad = useRef(null);
  const refPrecioU = useRef(null);

  const onChangeBodegas = (key) => {
    iniciarRegistro();
    setIdBodega(key);
  };

  useEffect(() => {
    setCargandoParams(false);
  }, []);

  useEffect(() => {
    if (!bodegaEstado) {
      iniciarRegistro();
    }
  }, [bodegaEstado]);

  const iniciarRegistro = () => {
    setCodigoEstado(false);
    setDescripcionEstado(false);
    setCantidad(1);
    setPrecio(0);
    setCodigo("");
    setArtDescripcion("");
    setCambiar(false);
    settotalArticulo(0);
    refCodigo.current.select();
  };

  const onChangeDescripcion = (e) => {
    setDescripcionSelect(e);
    setCodigo(e.value);
    setArtDescripcion(e.label);
    setCantidadEstado(false);
    setPrecioEstado(false);
    settotalArticulo(precio);
    refPrecioU.current.select();
  };

  const onChange = (e) => {
    const item = e.target;

    switch (item.id) {
      case "codigo":
        setCodigo(item.value);
        break;
      case "precioUnt":
        setPrecio(item.value);
        break;
      case "cantidad":
        settotalArticulo(item.value * precio);
        setCantidad(item.value);
        break;

      default:
        break;
    }
  };
  const onSearch = (e) => {
    buscarArticulo(e.toUpperCase());
  };
  const onPressEnter = async (e) => {
    const item = e.target;
    if (item.id === "codigo") {
      if (idbodega > 0) {
        if (item.value) {
          setCodigo(item.value.toUpperCase());
          const art = await articulosCodigo(item.value);
          if (art === "ERROR") {
            setCambiar(true);
            setArtDescripcion("");
            console.log("Articulo no Encontrado");
          } else {
            setArtDescripcion(art.descripcion);
            setPrecioEstado(false);
            setCantidadEstado(false);
            setCambiar(true);
            refPrecioU.current.select();
          }
        } else {
          refDescripcion.current.focus();
        }
      } else {
        console.log("Error seleccione bodega");
      }
    }

    if (item.id === "precioUnt") {
      if (precio > 0) {
        settotalArticulo(precio);
        refCantidad.current.select();
      } else {
        console.log("el precio no puede ser 0");
      }
    }

    if (item.id === "cantidad") {
      if (totalArticulo > 0) {
        const resp = agregarDatos(
          { codigo, artDescripcion, cantidad, precio },
          idbodega
        );
        if (resp) {
          setBodegaEstado(true);
          iniciarRegistro();
        }
      } else {
        console.log("el precio o la cantidad no puede ser 0");
      }
    }
  };

  return (
    <Row align="middle" justify="center" gutter={16}>
      <Col span={3}>
        <Text>Bodega:</Text>
        <Select
          onChange={onChangeBodegas}
          defaultValue={"Seleccione..."}
          loading={cargandoParams}
          disabled={bodegaEstado}
        >
          {bodegas &&
            bodegas.map((bodega) => {
              return <Option key={bodega.id}>{bodega.nombre}</Option>;
            })}
        </Select>
      </Col>
      <Col span={2}>
        <Text>Código:</Text>
        <Input
          onChange={onChange}
          onPressEnter={onPressEnter}
          value={codigo}
          ref={refCodigo}
          disabled={codigoEstado}
          id="codigo"
        />
      </Col>
      <Col span={10}>
        <Text>Descripción:</Text>
        {cambiar ? (
          <Input
            value={artDescripcion}
            disabled
            style={{ width: "100%" }}
            id="descripcion"
          />
        ) : (
          <Select
            ref={refDescripcion}
            disabled={descripcionEstado}
            showSearch
            labelInValue={true}
            value={descripcionSelect}
            optionFilterProp="children"
            onSearch={onSearch}
            value={descripcionSelect}
            onChange={onChangeDescripcion}
            style={{ width: "100%" }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {articulos.map((articulo) => {
              return (
                <Option key={articulo.idarticulo}>
                  {articulo.descripcion}
                </Option>
              );
            })}
          </Select>
        )}
      </Col>
      <Col span={3}>
        <Text>Precio Und:</Text>
        <Input
          onChange={onChange}
          ref={refPrecioU}
          disabled={precioEstado}
          onPressEnter={onPressEnter}
          value={precio}
          id="precioUnt"
        />
      </Col>
      <Col span={3}>
        <Text>Cantidad:</Text>
        <Input
          ref={refCantidad}
          value={cantidad}
          onChange={onChange}
          disabled={cantidadEstado}
          onPressEnter={onPressEnter}
          id="cantidad"
        />
      </Col>
      <Col span={3}>
        <Row>
          <Text style={{ width: "100%" }}>Total:</Text>
        </Row>
        <Row>
          <Text style={{ width: "100%", textAlign: "end" }}>
            {totalArticulo}
          </Text>
        </Row>
      </Col>
    </Row>
  );
}
export default Encabezado;
