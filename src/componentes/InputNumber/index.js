import React from "react";
import { InputNumber, Typography } from "antd";
import "./styles.css";
const { Text } = Typography;

export default function index(props) {
  const { text, min, max, size, onChange, value, disabled, onBlur,ref } = props;
  const vacio = () => {};
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
        ref={ref}
        /*formatter={(value) =>
          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}*/
        value={value}
        disabled={disabled || false}
        onBlur={onBlur || vacio}
      />
    </div>
  );
}
