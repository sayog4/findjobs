import React from 'react'
import { Col, Row, Form, Tabs, Input, Select, Button, Typography } from 'antd'
import Pagelayout from '../../components/Pagelayout'

const { TabPane } = Tabs
const { TextArea } = Input
const { Option } = Select
const { Text } = Typography

const Postjob = () => {
  const [jobInfo, setJobInfo] = React.useState({})
  const [activeTab, setActiveTab] = React.useState('0')

  function jobInfoFinish(values: any) {
    console.log(values)
    setActiveTab('1')
  }

  function finalFormFinish(values: any) {
    console.log(values)
  }

  return (
    <Pagelayout>
      <Tabs defaultActiveKey="0" activeKey={activeTab}>
        <TabPane tab="Job Info" key="0">
          <Form layout="vertical" onFinish={jobInfoFinish}>
            <Row gutter={16}>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Job Title"
                  name="title"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Department"
                  name="department"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Salary From"
                  name="salaryFrom"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Salary To"
                  name="salaryTo"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Skills"
                  name="skillsRequired"
                  rules={[
                    { required: true },
                    {
                      pattern: new RegExp(/^([a-z0-9s]+,)*([a-z0-9s]+){1}$/i),
                      message: 'use comma seperated values',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Minimum Qualification"
                  name="minimumQualification"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="Degree">Degree</Option>
                    <Option value="Plus 2">Plus 2</Option>
                    <Option value="10th">10th</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item
                  label="Small Description"
                  name="smallDescription"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item
                  label="Full Description"
                  name="fullDescription"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={5} />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form>
        </TabPane>
        <TabPane tab="Company Info" key="1">
          <Form layout="vertical" onFinish={finalFormFinish}>
            <Row gutter={16}>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Company Name"
                  name="company"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Company Email"
                  name="email"
                  rules={[{ required: true }, { type: 'email' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item
                  label="Company Description"
                  name="companyDescription"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
            <Button onClick={() => setActiveTab('0')}>Previous</Button>
            <Button htmlType="submit" type="primary">
              Post Job
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </Pagelayout>
  )
}
export default Postjob
