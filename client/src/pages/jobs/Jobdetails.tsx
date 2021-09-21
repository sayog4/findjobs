import React from 'react'
import { Divider, Spin, Tag, Typography } from 'antd'
import { RouteComponentProps } from 'react-router'
import Pagelayout from '../../components/Pagelayout'
import { useJobDetail } from './hooks/useJob'

const { Title, Text, Paragraph } = Typography

function Jobdetails({ match }: RouteComponentProps<{ id: string }>) {
  const { data, isError, isLoading, error } = useJobDetail(match.params.id)

  let errMsg = 'Network error'
  if (isError && error?.response?.data?.message) {
    errMsg = error?.response?.data?.message
  }
  return (
    <Pagelayout>
      {isLoading && <Spin size="large" />}
      {isError && (
        <Title
          style={{
            color: 'red',
          }}
          level={4}
        >
          {errMsg}
        </Title>
      )}
      {data && (
        <>
          <Title level={2}>{data.title}</Title>
          <Title level={4}>{data.companyName}</Title>
          <Paragraph>
            <Text strong>Info: </Text>
            {data.shortDescription}
          </Paragraph>
          <Paragraph>
            <Text strong>Description: </Text>
            {data.fullDescription}
          </Paragraph>
          <Text strong>Skills required: </Text>
          {data.skillsRequired.split(',').map((s, i) => (
            <Tag color="purple" key={i}>
              {s}
            </Tag>
          ))}
          <Paragraph>
            <Text strong>Experience: </Text> {data.experience}
          </Paragraph>
          <Paragraph>
            <Text strong>Minimum Qualification: </Text>{' '}
            {data.minimumQualification}
          </Paragraph>
          <Divider />
          <Paragraph>
            <Text strong>Salary range: </Text> {data.salaryFrom} -{' '}
            {data.salaryTo}
          </Paragraph>
          <Paragraph>
            <Text strong>Department: </Text>
            {data.department}
          </Paragraph>
          <Paragraph>
            <Text strong>Company profile</Text>
            {data.companyDescription}
          </Paragraph>
          <Paragraph>
            <Text strong>Total Candidates Applied: </Text>
            {data.appliedCandidates?.length}
          </Paragraph>
          <div>show button for applying/editing</div>
          <Paragraph>
            <Text strong>Posted On: </Text>
            {data.createdAt}
          </Paragraph>
        </>
      )}
    </Pagelayout>
  )
}

export default Jobdetails
