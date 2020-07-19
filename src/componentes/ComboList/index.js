import React from "react";
import { Select, Typography } from "antd";

import "./styles.css";

const { Option } = Select;
const { Text } = Typography;

export default function ComboList(props) {
  const {
    datos,
    title,
    size,
    value,
    cargando,
    onChange,
    disabled,
    onSearch,
    onFocus,
  } = props;

  return (
    <div className="combo">
      <Text>{title}</Text>
      <Select
        disabled={disabled}
        loading={cargando}
        onFocus={onFocus}
        showSearch
        placeholder={title}
        optionFilterProp="children"
        labelInValue={true}
        value={value}
        style={size || { width: 250 }}
        onChange={onChange}
        size="small"
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {datos.map((dato) => {
          return <Option key={dato.id}>{dato.dato}</Option>;
        })}
      </Select>
    </div>
  );
}
