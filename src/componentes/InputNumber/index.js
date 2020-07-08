import React from "react";
import { InputNumber } from "antd";
import { Typography } from "antd";
import "./styles.css";
const { Text } = Typography;

export default function index(props) {
  const { text, min, max, size, onChange, value } = props;

  return (
    <div className="input-number">
      <Text>{text}</Text>
      <InputNumber
        min={min}
        max={max}
        style={size || { width: 250 }}
        onChange={onChange}
        placeholder={text}
        size="small"
        value={value}
      />
    </div>
  );
}
