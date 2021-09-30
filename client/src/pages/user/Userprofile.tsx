import React from 'react'
import { useQueryClient } from 'react-query'
import {
  Tabs,
  Form,
  Input,
  Row,
  Col,
  Button,
  Tooltip,
  Space,
  message,
} from 'antd'
import Pagelayout from '../../components/Pagelayout'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useAuth } from '../../context/userContext'
import { useUpdate } from './hooks/userUser'
import { queryKeys } from '../../reqct-query/constants'

const { TabPane } = Tabs
const { TextArea } = Input

function Userprofile() {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [personalInfo, setPersonalInfo] = React.useState({})
  const [activeTab, setActiveTab] = React.useState('0')
  const [errors, setErrors] = React.useState<any>({})
  const { mutate, isError, error, isLoading } = useUpdate()

  React.useEffect(() => {
    if (isError) {
      let err = error as any
      setErrors(err?.response?.data?.errors)
      message.error('check prev tab for more error')
    }
  }, [error, isError])

  function personalInfoSubmit(values: any) {
    setPersonalInfo(values)
    setActiveTab('1')
  }
  function finalFormSubmit(values: any) {
    setErrors({})
    const obj = { ...personalInfo, ...values }
    mutate(obj, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.me)
        setActiveTab('0')
      },
    })
  }

  return (
    <Pagelayout>
      <Tabs defaultActiveKey="0" activeKey={activeTab}>
        <TabPane tab="Personal Info" key="0">
          <Form
            initialValues={user}
            layout="vertical"
            onFinish={personalInfoSubmit}
          >
            <Row gutter={16}>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.firstName && 'error'}
                  help={errors?.firstName}
                  label="First name"
                  name="firstName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.lastName && 'error'}
                  help={errors?.lastName}
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.email && 'error'}
                  help={errors?.email}
                  label="Email"
                  name="email"
                  rules={[
                    { required: true },
                    { type: 'email', message: 'provide valid email' },
                  ]}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.mobileNumber && 'error'}
                  help={errors?.mobileNumber}
                  label="Mobile Number"
                  name="mobileNumber"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.portfolio && 'error'}
                  help={errors?.portfolio}
                  label="Portfolio Url"
                  name="portfolio"
                  rules={[
                    { required: true },
                    { type: 'url', message: 'provide valid url' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item
                  validateStatus={errors?.about && 'error'}
                  help={errors?.about}
                  label="Your infomation"
                  name="about"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item
                  validateStatus={errors?.address && 'error'}
                  help={errors?.address}
                  label="Address"
                  name="address"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form>
        </TabPane>

        <TabPane tab="Skills and Education" key="1">
          <Form
            initialValues={user}
            layout="vertical"
            onFinish={finalFormSubmit}
          >
            <Row>
              <Col lg={24} sm={24}>
                <Form.List name="education">
                  {(education, { add, remove }) => (
                    <>
                      {education.map((field, i) => (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Form.Item
                            validateStatus={errors?.education && 'error'}
                            help={errors?.education}
                            rules={[{ required: true }]}
                            style={{ width: '90%' }}
                            {...field}
                            label="Education"
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                          <Space size="large">
                            <Tooltip title="Add More">
                              <Button
                                className="ml-sm"
                                shape="circle"
                                icon={<PlusCircleOutlined />}
                                onClick={() => add()}
                              />
                            </Tooltip>
                            {i !== 0 && (
                              <Tooltip title="Remove">
                                <Button
                                  shape="circle"
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(i)}
                                />
                              </Tooltip>
                            )}
                          </Space>
                        </div>
                      ))}
                    </>
                  )}
                </Form.List>
              </Col>
              <Col lg={24} sm={24}>
                <Form.List name="skills">
                  {(skills, { add, remove }) => (
                    <>
                      {skills.map((field, i) => (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Form.Item
                            validateStatus={errors?.skills && 'error'}
                            help={errors?.skills}
                            rules={[{ required: true }]}
                            {...field}
                            style={{ width: '90%' }}
                            label="Skills"
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                          <Space size="large">
                            <Tooltip title="Add More">
                              <Button
                                className="ml-sm"
                                shape="circle"
                                icon={<PlusCircleOutlined />}
                                onClick={() => add()}
                              />
                            </Tooltip>
                            {i !== 0 && (
                              <Tooltip title="Remove">
                                <Button
                                  shape="circle"
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(i)}
                                />
                              </Tooltip>
                            )}
                          </Space>
                        </div>
                      ))}
                    </>
                  )}
                </Form.List>
              </Col>

              <Col lg={24} sm={24}>
                <Form.List name="projects">
                  {(projects, { add, remove }) => (
                    <>
                      {projects.map((field, i) => (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Form.Item
                            validateStatus={errors?.projects && 'error'}
                            help={errors?.projects}
                            rules={[{ required: true }]}
                            style={{ width: '90%' }}
                            label="Projects"
                            {...field}
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                          <Space size="large">
                            <Tooltip title="Add More">
                              <Button
                                className="ml-sm"
                                shape="circle"
                                icon={<PlusCircleOutlined />}
                                onClick={() => add()}
                              />
                            </Tooltip>
                            {i !== 0 && (
                              <Tooltip title="Remove">
                                <Button
                                  shape="circle"
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(i)}
                                />
                              </Tooltip>
                            )}
                          </Space>
                        </div>
                      ))}
                    </>
                  )}
                </Form.List>
              </Col>

              <Col lg={24} sm={24}>
                <Form.List name="experience">
                  {(experience, { add, remove }) => (
                    <>
                      {experience.map((field, i) => (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Form.Item
                            validateStatus={errors?.experience && 'error'}
                            help={errors?.experience}
                            rules={[{ required: true }]}
                            style={{ width: '90%' }}
                            {...field}
                            label="Experience"
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                          <Space size="large">
                            <Tooltip title="Add More">
                              <Button
                                className="ml-sm"
                                shape="circle"
                                icon={<PlusCircleOutlined />}
                                onClick={() => add()}
                              />
                            </Tooltip>
                            {i !== 0 && (
                              <Tooltip title="Remove">
                                <Button
                                  shape="circle"
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(i)}
                                />
                              </Tooltip>
                            )}
                          </Space>
                        </div>
                      ))}
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
            <Space size="middle">
              <Button onClick={() => setActiveTab('0')}>Previous</Button>
              <Button disabled={isLoading} type="primary" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form>
        </TabPane>
      </Tabs>
    </Pagelayout>
  )
}

export default Userprofile
