import React, { useState } from "react";
import { Input, Radio } from "antd";
import axios from "axios";
import { API } from "../../config/keys";

const { Search } = Input;

export default function Encabezado(props) {
  const [value, setValue] = useState(1);
  const { setDatosTabla } = props;

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  const onSearch = async (dato) => {
    let res;
    const Token = sessionStorage.getItem("Token");
    if (value === 2) {
      res = await axios.get(
        API + "clientes/filtros/nombre/" + dato.toUpperCase(),
        {
          headers: {
            authorization: Token,
          },
        }
      );
    } else if (value === 1) {
      res = await axios.get(
        API + "clientes/filtros/documento/" + dato.toUpperCase(),
        {
          headers: {
            authorization: Token,
          },
        }
      );
    }
    if (res.status === 200) {
      setDatosTabla(res.data);
    } else if (res.status === 201) {
      setDatosTabla([]);
    }
  };

  return (
    <>
      <Radio.Group buttonStyle="solid" onChange={onChange} value={value}>
        <Radio style={radioStyle} value={1}>
          Documento
        </Radio>
        <Radio style={radioStyle} value={2}>
          Nombre
        </Radio>
      </Radio.Group>
      <Search placeholder="Buscar" onSearch={onSearch} enterButton />
    </>
  );
}
