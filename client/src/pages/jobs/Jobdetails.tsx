import React from 'react'
import { useQueryClient } from 'react-query'
import { Button, Divider, Spin, Tag, Typography } from 'antd'
import { RouteComponentProps } from 'react-router'
import Pagelayout from '../../components/Pagelayout'
import { useApplyJob, useJobDetail } from './hooks/useJob'
import { useAuth } from '../../context/userContext'
import { Link } from 'react-router-dom'
import { queryKeys } from '../../reqct-query/constants'
import { formatDate } from '../../utils/formatDate'

const { Title, Text, Paragraph } = Typography

function Jobdetails({ match }: RouteComponentProps<{ id: string }>) {
  const queryClient = useQueryClient()
  const { data, isError, isLoading, error } = useJobDetail(match.params.id)
  const { user } = useAuth()
  const { mutate, isError: isMerror, error: mError } = useApplyJob()
  let errMsg = 'Network error'
  if (isError && error?.response?.data?.message) {
    errMsg = error?.response?.data?.message
  }
  if (isMerror) {
    errMsg = mError?.response?.data?.message || mError?.response?.data?.error
  }

  const alreadyApplied = data?.appliedCandidates?.find(
    (c) => c.userId === user?._id
  )

  function handleApplyJob() {
    mutate(data?._id as string, {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.job, data?._id])
      },
    })
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
          <Paragraph>{data.shortDescription}</Paragraph>
          <Paragraph>
            <Text strong className="mr-sm">
              Job Description:{' '}
            </Text>
            {data.fullDescription}
          </Paragraph>
          <Text strong className="mr-sm">
            Skills required:{' '}
          </Text>
          {data.skillsRequired.split(',').map((s, i) => (
            <Tag color="purple" key={i}>
              {s}
            </Tag>
          ))}
          <Paragraph>
            <Text strong className="mr-sm">
              Experience:{' '}
            </Text>{' '}
            {data.experience}
          </Paragraph>
          <Paragraph>
            <Text strong className="mr-sm">
              Minimum Qualification:{' '}
            </Text>{' '}
            {data.minimumQualification}
          </Paragraph>
          <Divider />
          <Paragraph>
            <Text strong className="mr-sm">
              Salary range:{' '}
            </Text>{' '}
            {data.salaryFrom} - {data.salaryTo}
          </Paragraph>
          <Paragraph>
            <Text strong className="mr-sm">
              Department:{' '}
            </Text>
            {data.department}
          </Paragraph>
          <Paragraph>
            <Text strong className="mr-sm">
              Company profile
            </Text>
            {data.companyDescription}
          </Paragraph>
          <Paragraph>
            <Text strong className="mr-sm">
              Total Candidates Applied:{' '}
            </Text>
            {data.appliedCandidates?.length}
          </Paragraph>

          <Paragraph>
            <Text strong className="mr-sm">
              Posted On:{' '}
            </Text>
            {formatDate(data.createdAt as Date)}
          </Paragraph>
          <Divider />

          <div>
            {data.postedBy === user?._id ? (
              <Button>
                <Link to={`/editjob/${data._id}`}>Edit Job</Link>
              </Button>
            ) : alreadyApplied ? (
              <Tag color="magenta">Already Applied</Tag>
            ) : (
              <>
                <Button type="primary" onClick={handleApplyJob}>
                  Apply Now
                </Button>
                {isMerror && (
                  <Title
                    style={{
                      color: 'red',
                    }}
                    level={5}
                  >
                    {errMsg}
                  </Title>
                )}
              </>
            )}
          </div>
        </>
      )}
    </Pagelayout>
  )
}

export default Jobdetails
