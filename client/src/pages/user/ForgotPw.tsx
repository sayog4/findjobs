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
import { useAuth } from '../../hooks/useAuth'

const { Title } = Typography

interface Err {
  email?: string
  password?: string
}

function ForgotPw() {
  const auth = useAuth()
  const [errors, setErrors] = React.useState<Err>({})
  async function onFinish(values: any) {
    setErrors({})
    const errors = await auth.forgotPw(values.email)
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

            <Button type="primary" htmlType="submit">
              Send reset password link
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default ForgotPw
