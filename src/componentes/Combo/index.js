import React from "react";
import { Select, Typography } from "antd";

import './styles.css'

const { Option } = Select;
const { Text } = Typography;

export default function Combo(props) {
  const { datos, titulo } = props;
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div className="combo">
      <Text>{titulo}</Text>
      <Select
        defaultValue="Seleccione..."
        style={{ width: 250 }}
        onChange={handleChange}
        size="small"
      >
        {datos.map((dato) => {
          return <Option value={dato}>{dato}</Option>;
        })}
      </Select>
    </div>
  );
}
