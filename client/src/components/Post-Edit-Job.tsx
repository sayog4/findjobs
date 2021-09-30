import React from 'react'
import {
  Col,
  Row,
  Form,
  Tabs,
  Input,
  Select,
  Button,
  InputNumber,
  Space,
} from 'antd'
import { Job } from '../shared/types'

const { TabPane } = Tabs
const { TextArea } = Input
const { Option } = Select

interface PostEditProps {
  activeTab: string
  companyFormFinish: (values: any) => void
  errors: any
  finalFormFinish: (values: any) => void
  changeTab: (value: string) => void
  edit?: boolean
  job?: Job
  isUpdating?: boolean
}

const PostEditJob: React.FC<PostEditProps> = ({
  activeTab,
  companyFormFinish,
  errors,
  finalFormFinish,
  changeTab,
  job,
  edit = false,
  isUpdating = false,
}) => {
  return (
    <Tabs defaultActiveKey="0" activeKey={activeTab}>
      <TabPane tab="Company Info" key="0">
        <Form
          layout="vertical"
          onFinish={companyFormFinish}
          initialValues={edit ? job : undefined}
        >
          <Row gutter={16}>
            <Col lg={8} sm={24} xs={24}>
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
            <Col lg={8} sm={24} xs={24}>
              <Form.Item
                validateStatus={errors?.companyEmail && 'error'}
                help={errors?.companyEmail}
                label="Company Email"
                name="email"
                rules={[{ required: true }, { type: 'email' }]}
              >
                <Input disabled={edit} />
              </Form.Item>
            </Col>
            <Col lg={8} sm={24} xs={24}>
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
            <Col lg={24} sm={24} xs={24}>
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
        <Form
          layout="vertical"
          onFinish={finalFormFinish}
          initialValues={edit ? job : undefined}
        >
          <Row gutter={16}>
            <Col lg={8} sm={24} xs={24}>
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
            <Col lg={8} sm={24} xs={24}>
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
            <Col lg={8} sm={24} xs={24}>
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
            <Col lg={8} sm={24} xs={24}>
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
            <Col lg={8} sm={24} xs={24}>
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
            <Col lg={8} sm={24} xs={24}>
              <Form.Item
                validateStatus={errors?.skillsRequired && 'error'}
                help={errors?.skillsRequired}
                label="Skills"
                name="skillsRequired"
                rules={[
                  { required: true },
                  {
                    pattern: new RegExp(
                      /^([a-z0-9()+\-*/.\s]+,)*([a-z0-9()+\-*/.\s]+){1}$/i
                    ),
                    message: 'use comma seperated values',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={8} sm={24} xs={24}>
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
            <Col lg={24} sm={24} xs={24}>
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
            <Col lg={24} sm={24} xs={24}>
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
          <Space size="middle">
            <Button onClick={() => changeTab('0')}>Previous</Button>
            <Button
              htmlType="submit"
              type="primary"
              disabled={isUpdating && isUpdating}
            >
              {edit ? 'Apply Changes' : 'Post Job'}
            </Button>
          </Space>
        </Form>
      </TabPane>
    </Tabs>
  )
}

export default PostEditJob
