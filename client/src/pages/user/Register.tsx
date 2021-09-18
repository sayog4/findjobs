import { Button, Col, Form, Input, Row, Divider, Typography, Card } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const { Title, Text } = Typography

interface Err {
  email?: string
  password?: string
  userName?: string
  confirmPassword?: string
}

function Register() {
  const auth = useAuth()
  const [errors, setErrors] = React.useState<Err>({})
  async function onFinish(values: any) {
    if (values.password !== values.confirmPassword) {
      setErrors({
        password: 'password do not match',
        confirmPassword: 'password do not match',
      })
      return
    }
    const errors = await auth.signUp(
      values.email,
      values.password,
      values.userName
    )
    setErrors(errors)
  }
  return (
    <Row justify="center" className="fcenter bg">
      <Col lg={8} md={16} sm={20} xs={24}>
        <Card>
          <Title level={3}>Register</Title>
          <Divider />
          <Form
            layout="vertical"
            name="register"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="userName"
              validateStatus={errors?.userName && 'error'}
              help={errors?.userName}
              rules={[
                { required: true, message: 'Username is required' },
                { min: 5, message: 'Username must be 5 character long' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              validateStatus={errors?.email && 'error'}
              help={errors?.email}
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              validateStatus={errors?.password && 'error'}
              help={errors?.password}
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be 6 characters long.' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              validateStatus={errors?.confirmPassword && 'error'}
              help={errors?.confirmPassword}
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your current password!',
                },
                {
                  min: 6,
                  message: 'Current password must be 6 characters long.',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form>
          <Divider />
          <Text>
            Already have an account ? <Link to="/login">Click here</Link> to
            login.
          </Text>
        </Card>
      </Col>
    </Row>
  )
}

export default Register
