import React, { useState, useRef, useEffect } from "react";
import { Input, Col, Row, Form, Select } from "antd";

const { Option } = Select;
const { Item } = Form;

function Encabezado({ bodegas, articulos, articulosCodigo }) {
  const [idbodega, setIdBodega] = useState(0);
  const [codigo, setCodigo] = useState({});
  const [cargandoParams, setCargandoParams] = useState(true);
  const [descripcion, setDescripcion] = useState();
  const refDescripcion = useRef(null);
  const refCodigo = useRef(null);
  const onChangeBodegas = (key) => {
    setIdBodega(key);
  };

  const onChangeDescripcion = (key) => {
    setDescripcion(key);
  };

  const onSearch = (key) => {
    console.log(key);
    setDescripcion(key);
  };

  useEffect(() => {
    setCargandoParams(false);
  }, [bodegas]);

  const onChange = (e) => {
    const item = e.target;
    switch (item.id) {
      case "basic_codigo":
        setCodigo(item.value);
        break;

      default:
        break;
    }
  };

  const onPressEnter = async (e) => {
    const item = e.target;

    if (item.id === "basic_codigo") {
      if (item.value) {
        setCodigo(item.value.toUpperCase());
        const art = await articulosCodigo(item.value);
        if (art === "ERROR") {
          console.log("Articulo no Encontrado");
        } else {
          setDescripcion({ id: art.idarticulo, value: art.descripcion });
        }
      } else {
        refDescripcion.current.focus();
      }
    }
  };

  return (
    <Form name="basic" layout="vertical">
      <Row align="middle" justify="center" gutter={16}>
        <Col span={3}>
          <Item label="Bodega" name="bodega">
            <Select
              onChange={onChangeBodegas}
              defaultValue={"Seleccione..."}
              loading={cargandoParams}
            >
              {bodegas &&
                bodegas.map((bodega) => {
                  return <Option key={bodega.id}>{bodega.nombre}</Option>;
                })}
            </Select>
          </Item>
        </Col>
        <Col span={2}>
          <Item label="Código" name="codigo">
            <Input
              onChange={onChange}
              onPressEnter={onPressEnter}
              value={codigo}
              ref={refCodigo}
            />
          </Item>
        </Col>
        <Col span={10}>
          <Item label="Descripción" name="descripcion">
            <Select
              onSearch={onSearch}
              showSearch
              allowClear
              ref={refDescripcion}
              value={descripcion}
              labelInValue={true}
              disabled={true}
              loading={true}
              optionFilterProp="children"
              onChange={onChangeDescripcion}
              size="small"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {articulos &&
                articulos.map((articulo) => {
                  return <Option key={articulo.id}>{articulo.nombre}</Option>;
                })}
            </Select>
          </Item>
        </Col>
        <Col span={3}>
          <Item label="Precio Unt" name="precioUnt">
            <Input onChange={onChange} />
          </Item>
        </Col>
        <Col span={3}>
          <Item label="Cantidad" name="cantidad">
            <Input onChange={onChange} />
          </Item>
        </Col>
        <Col span={3}>
          <Item label="Total" name="total">
            <Input disabled onChange={onChange} />
          </Item>
        </Col>
      </Row>
    </Form>
  );
}
export default Encabezado;
