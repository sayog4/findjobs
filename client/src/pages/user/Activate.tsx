import { Button, Card, message, Row, Col } from 'antd'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Activate({ match }: RouteComponentProps<{ token: string }>) {
  const [err, setErr] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const auth = useAuth()
  async function handleClick() {
    setLoading(true)
    setErr('')
    const errors = await auth.signUp(match.params.token)
    setLoading(false)
    setErr(errors)
  }
  if (err) {
    message.error(err)
  }

  return (
    <Row justify="center" className="fcenter bg">
      <Col lg={8} md={16} sm={20} xs={24}>
        <Card size="default" title="Activate your account">
          <p>Click on button below to activate your account.</p>
          <Button disabled={loading} onClick={handleClick} type="primary">
            Activate Account
          </Button>
        </Card>
      </Col>
    </Row>
  )
}

export default Activate
