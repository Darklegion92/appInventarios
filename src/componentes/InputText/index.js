import React from "react";
import { Input } from "antd";
import { Typography } from "antd";
import "./styles.css";

const { Text } = Typography;

export default function InputText(props) {
  const { text, size, onChange, ref, value, disabled, onBlur } = props;
  const vacio = () => {};
  return (
    <div className="input-text">
      <Text>{text}</Text>
      <Input
        disabled={disabled || false}
        placeholder={text}
        value={value}
        size="small"
        style={size || { width: 250 }}
        onChange={onChange}
        allowClear
        onBlur={onBlur || vacio}
        ref={ref}
      />
    </div>
  );
}
