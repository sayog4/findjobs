import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Col,
  Row,
  Form,
  Tabs,
  Input,
  Select,
  Button,
  message,
  InputNumber,
} from 'antd'
import Pagelayout from '../../components/Pagelayout'
import { usePostJob } from './hooks/useJob'

const { TabPane } = Tabs
const { TextArea } = Input
const { Option } = Select

const Postjob = () => {
  const history = useHistory()
  const { mutate, isError, isSuccess, error } = usePostJob()

  const [errors, setErrors] = React.useState<any>()
  const [comapnyInfo, setCompanyInfo] = React.useState({})
  const [activeTab, setActiveTab] = React.useState('0')

  function companyFormFinish(values: any) {
    setCompanyInfo(values)
    setActiveTab('1')
  }

  function finalFormFinish(values: any) {
    setErrors({})
    const newObj = {
      ...comapnyInfo,
      salaryFrom: parseFloat(values.salaryFrom),
      salaryTo: parseFloat(values.salaryTo),
      ...values,
    }
    mutate(newObj)
  }

  React.useEffect(() => {
    if (isSuccess) {
      history.push('/')
    }
  }, [isSuccess, history])

  React.useEffect(() => {
    if (isError) {
      let err = error as any
      setErrors(err?.response?.data?.errors)
      message.error('Check previous and current tab for error')
    }
  }, [error, isError])

  return (
    <Pagelayout>
      <Tabs defaultActiveKey="0" activeKey={activeTab}>
        <TabPane tab="Company Info" key="0">
          <Form layout="vertical" onFinish={companyFormFinish}>
            <Row gutter={16}>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.companyName && 'error'}
                  help={errors?.companyName}
                  label="Company Name"
                  name="companyName"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.companyEmail && 'error'}
                  help={errors?.companyEmail}
                  label="Company Email"
                  name="email"
                  rules={[{ required: true }, { type: 'email' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.phoneNumber && 'error'}
                  help={errors?.phoneNumber}
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item
                  validateStatus={errors?.companyDescription && 'error'}
                  help={errors?.companyDescription}
                  label="Company Description"
                  name="companyDescription"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form>
        </TabPane>

        <TabPane tab="Job Info" key="1">
          <Form layout="vertical" onFinish={finalFormFinish}>
            <Row gutter={16}>
              <Col lg={8} sm={24}>
                <Form.Item
                  label="Job Title"
                  name="title"
                  validateStatus={errors?.title && 'error'}
                  help={errors?.title}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.department && 'error'}
                  help={errors?.department}
                  label="Department"
                  name="department"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.experience && 'error'}
                  help={errors?.experience}
                  label="Experience"
                  name="experience"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.salaryFrom && 'error'}
                  help={errors?.salaryFrom}
                  label="Salary From"
                  name="salaryFrom"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.salaryTo && 'error'}
                  help={errors?.salaryTo}
                  label="Salary To"
                  name="salaryTo"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col lg={8} sm={24}>
                <Form.Item
                  validateStatus={errors?.skillsRequired && 'error'}
                  help={errors?.skillsRequired}
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
                  validateStatus={errors?.minimumQualification && 'error'}
                  help={errors?.minimumQualification}
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
                  validateStatus={errors?.shortDescription && 'error'}
                  help={errors?.shortDescription}
                  label="Short Description"
                  name="shortDescription"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item
                  validateStatus={errors?.fullDescription && 'error'}
                  help={errors?.fullDescription}
                  label="Full Description"
                  name="fullDescription"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={5} />
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
