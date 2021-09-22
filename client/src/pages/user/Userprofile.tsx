import React from 'react'
import { Tabs, Form, Input, Row, Col, Button, Tooltip } from 'antd'
import Pagelayout from '../../components/Pagelayout'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
const { TextArea } = Input

function Userprofile() {
  const [personalInfo, setPersonalInfo] = React.useState({})
  const [activeTab, setActiveTab] = React.useState('0')

  function personalInfoSubmit(values: any) {
    setPersonalInfo(values)
    setActiveTab('1')
  }
  function finalFormSubmit(values: any) {
    const obj = { ...personalInfo, ...values }
    console.log(obj)
  }

  return (
    <Pagelayout>
      <Tabs defaultActiveKey="0" activeKey={activeTab}>
        <TabPane tab="Personal Info" key="0">
          <Form layout="vertical" onFinish={personalInfoSubmit}>
            <Row gutter={16}>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="First name"
                  name="firstname"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true },
                    { type: 'email', message: 'provide valid email' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Mobile Number"
                  name="mobileNumber"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
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
                  label="Your infomation"
                  name="about"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item
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
          <Form layout="vertical" onFinish={finalFormSubmit}>
            <Row>
              <Col lg={24} sm={24}>
                <Form.List name="education">
                  {(education, { add, remove }) => (
                    <>
                      {education.map((field, i) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Form.Item
                            rules={[{ required: true }]}
                            style={{ width: '80%' }}
                            {...field}
                            label="Education"
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                          <Tooltip title="Add More">
                            <Button
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
                        <div>
                          <Form.Item
                            rules={[{ required: true }]}
                            {...field}
                            style={{ width: '80%' }}
                            label="Skills"
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                          <Tooltip title="Add More">
                            <Button
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
                        <div>
                          <Form.Item
                            rules={[{ required: true }]}
                            style={{ width: '80%' }}
                            label="Projects"
                            {...field}
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                          <Tooltip title="Add More">
                            <Button
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
                        <div>
                          <Form.Item
                            rules={[{ required: true }]}
                            style={{ width: '80%' }}
                            {...field}
                            label="Experience"
                          >
                            <TextArea rows={4} />
                          </Form.Item>
                          <Tooltip title="Add More">
                            <Button
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
                        </div>
                      ))}
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
            <Button onClick={() => setActiveTab('0')}>Previous</Button>
            <Button htmlType="submit">Update</Button>
          </Form>
        </TabPane>
      </Tabs>
    </Pagelayout>
  )
}

export default Userprofile
