import { Row, Col, Form, Button, Input, Card, Typography, Divider } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const { Title, Text } = Typography

interface Err {
  email?: string
  password?: string
}

function Login() {
  const auth = useAuth()
  const [errors, setErrors] = React.useState<Err>({})
  async function onFinish(values: any) {
    const errors = await auth.logIn(values.email, values.password)
    setErrors(errors)
  }
  return (
    <Row justify="center" className="fcenter bg">
      <Col lg={8} md={16} sm={20} xs={24}>
        <Card>
          <Title level={3}>Login</Title>
          <Divider />
          <Form
            layout="vertical"
            name="login"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email' },
              ]}
              validateStatus={errors?.email && 'error'}
              help={errors?.email}
            >
              <Input id="error" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              validateStatus={errors?.password && 'error'}
              help={errors?.password}
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be 6 characters long.' },
              ]}
            >
              <Input.Password id="error" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
          <Divider />
          <Text>
            New user ? <Link to="/register">Click here</Link> to register.
          </Text>
        </Card>
      </Col>
    </Row>
  )
}

export default Login
