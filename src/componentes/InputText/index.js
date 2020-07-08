import React from "react";
import { Input } from "antd";
import { Typography } from "antd";
import "./styles.css";

const { Text } = Typography;

export default function InputText(props) {
  const { text, size, onChange,value } = props;
  return (
    <div className="input-text">
      <Text>{text}</Text>
      <Input
        placeholder={text}
        value={value}
        size="small"
        style={size || { width: 250 }}
        onChange={onChange}
      />
    </div>
  );
}
