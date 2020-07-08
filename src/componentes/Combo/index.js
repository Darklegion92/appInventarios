import React from "react";
import { Select, Typography } from "antd";

import "./styles.css";

const { Option } = Select;
const { Text } = Typography;

export default function Combo(props) {
  const { datos, titulo, size, valor, onChange } = props;

  return (
    <div className="combo">
      <Text>{titulo}</Text>
      <Select
        labelInValue={true}
        value={valor}
        style={size || { width: 250 }}
        onChange={onChange}
        size="small"
      >
        {datos.map((dato) => {
          return <Option key={dato.id}>{dato.dato}</Option>;
        })}
      </Select>
    </div>
  );
}
