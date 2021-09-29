import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { LoadingOutlined } from '@ant-design/icons'
import { Row, Col, Typography, Divider, Button, Card, Spin, Tag } from 'antd'
import Pagelayout from '../../components/Pagelayout'
import { Link } from 'react-router-dom'
import { useGetAllJobs } from './hooks/useJob'
import { Job } from '../../shared/types'
import { useSearchContext } from '../../context/searchContext'

const { Title, Text } = Typography

const Home: React.FC = () => {
  const { search } = useSearchContext()
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError } =
    useGetAllJobs(search)

  return (
    <Pagelayout>
      {isLoading && <Spin size="large" />}

      {isError && (
        <Title level={3} style={{ color: 'red' }}>
          Network error please make sure you are connected to internet
        </Title>
      )}
      <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
        <Scrollable data={data} />
        {isFetching && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        )}
      </InfiniteScroll>
    </Pagelayout>
  )
}

function Scrollable({ data }: any) {
  return (
    <Row gutter={[16, 24]}>
      {data?.pages.map((pageData: any) =>
        pageData.results.jobs.map((job: Job) => (
          <Col lg={12} sm={24} key={job._id}>
            <Card>
              <Title level={4}>{job.title}</Title>
              <Text>Company: {job.companyName}</Text>
              <Divider />
              <Text>{job.shortDescription}</Text>
              <div className="flex">
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
        ))
      )}
    </Row>
  )
}
export default Home
