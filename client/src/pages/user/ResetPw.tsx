import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Card,
  Typography,
  Divider,
  message,
} from 'antd'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { useAuth } from '../../hooks/useAuth'

const { Title } = Typography

interface Err {
  email?: string
  password?: string
  confirmPassword?: string
}

function ResetPw({ match }: RouteComponentProps<{ token: string }>) {
  const auth = useAuth()
  const [errors, setErrors] = React.useState<Err>({})
  async function onFinish(values: any) {
    setErrors({})
    if (values.password !== values.confirmPassword) {
      setErrors({
        password: 'password do not match',
        confirmPassword: 'password do not match',
      })
      return
    }
    const errors = await auth.resetPw(match.params.token, values.password)
    setErrors(errors)
  }

  if (typeof errors === 'string') {
    message.error(errors)
  }
  return (
    <Row justify="center" className="fcenter bg">
      <Col lg={8} md={16} sm={20} xs={24}>
        <Card>
          <Title level={3}>Forgot Password</Title>
          <Divider />
          <Form
            layout="vertical"
            name="forgotPassword"
            onFinish={onFinish}
            autoComplete="off"
          >
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
              Reset password
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default ResetPw
