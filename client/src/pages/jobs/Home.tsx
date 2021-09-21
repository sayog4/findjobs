import React from 'react'
import {
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Card,
  Space,
  Spin,
  Tag,
} from 'antd'
import Pagelayout from '../../components/Pagelayout'
import { Link } from 'react-router-dom'
import { useGetAllJobs } from './hooks/useJob'

const { Title, Text } = Typography

const Home = () => {
  const { data, isError, isLoading } = useGetAllJobs()

  return (
    <Pagelayout>
      {isLoading && <Spin size="large" />}
      <Row gutter={[16, 24]}>
        {isError && (
          <Title level={3} style={{ color: 'red' }}>
            Network error please make sure you are connected to internet
          </Title>
        )}
        {data?.data.map((job) => (
          <Col lg={12} sm={24} key={job._id}>
            <Card>
              <Title level={4}>{job.title}</Title>
              <Text>Company: {job.companyName}</Text>
              <Divider />
              <Text>{job.shortDescription}</Text>
              <div className="flex-center">
                <Text>
                  Salary :{' '}
                  <strong>
                    {job.salaryFrom} - {job.salaryTo}
                  </strong>
                </Text>
                <Text>
                  Experience : <strong>{job.experience} Years</strong>
                </Text>
              </div>
              <Divider />
              <Text>Skills required : </Text>
              {job.skillsRequired.split(',').map((s, i) => (
                <Tag color="purple" key={i}>
                  {s}
                </Tag>
              ))}
              <Divider />
              <div className="flex-center">
                <Link to={`/jobs/${job._id}`}>
                  <Button type="link">Details</Button>
                </Link>
                <Text>Posted on: {job.createdAt}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagelayout>
  )
}
export default Home
