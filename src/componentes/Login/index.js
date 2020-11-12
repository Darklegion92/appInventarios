import React, { useContext } from 'react'
import { Form, Input, Button, Checkbox, Typography } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { GlobalContext } from '../../context/GlobalContext'
import './styles.css'

const { Title } = Typography

const Login = () => {
  const { login } = useContext(GlobalContext)
  return (
    <div className='form-login'>
      <img src='img/logo.png' alt='imgLogo' />
      <Title level={2}>INGRESO USUARIO</Title>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true
        }}
        onFinish={login}
      >
        <Form.Item
          name='usuario'
          rules={[
            {
              required: true,
              message: 'Campo usuario no puede estar vacío'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Usuario'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Campo contraseña no puede estar vacío'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Contraseña'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Recordar</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            INGRESAR
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
