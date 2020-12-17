import React, { useState } from "react";
import { Menu, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./styles.css";

const { SubMenu } = Menu;
const { Text } = Typography;

export default function Encabezado(props) {
  const [current, setCurrent] = useState();
  const { datos, setSeleccion, nombre } = props;

  const handleClick = (e) => {
    setCurrent({ current: e.key });
    setSeleccion(e.key);
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item>
        <img src="img/logo-solo.png" alt="logo-solo" width="30" height="30" />
      </Menu.Item>
      {datos.map((dato) => {
        return (
          <SubMenu icon={dato.icon} title={dato.titulo}>
            {dato.lista.map((item) => {
              return (
                <Menu.Item key={dato.titulo + "-" + item}>{item}</Menu.Item>
              );
            })}
          </SubMenu>
        );
      })}
      <div>
        <Avatar size={20} icon={<UserOutlined />} />
        <Text>{nombre}</Text>
      </div>
      <Menu.Item key="salir">
        <Text>Salir</Text>
      </Menu.Item>
    </Menu>
  );
}
