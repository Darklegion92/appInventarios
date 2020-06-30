import React, { useState } from "react";
import { Input, Radio } from "antd";

const { Search } = Input;

export default function Encabezado() {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
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
      <Search
        placeholder="Buscar"
        onSearch={(value) => console.log(value)}
        enterButton
      />
    </>
  );
}
