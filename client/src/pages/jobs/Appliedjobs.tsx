import { Spin, Table, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Pagelayout from '../../components/Pagelayout'
import { formatDate } from '../../utils/formatDate'
import { useGetAppliedJobs } from './hooks/useJob'

const { Title } = Typography

function Appliedjobs() {
  const { data, error, isLoading, isError } = useGetAppliedJobs()

  let errMsg = 'something went wrong'
  if (isError && error?.response?.data?.message) {
    errMsg = error?.response?.data?.message
  }
  const appliedJobs = []
  if (data) {
    let obj = {
      title: data.appliedJobs[0]?.jobId.title,
      companyName: data.appliedJobs[0]?.jobId.companyName,
      appliedDate:
        data.appliedJobs[0]?.appliedDate &&
        formatDate(data.appliedJobs[0]?.appliedDate),
    }
    appliedJobs.push(obj)
  }
  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      render: (text: string) => (
        <Link to={`/jobs/${data?.appliedJobs[0]?.jobId._id}`}>{text}</Link>
      ),
    },
    { title: 'Company Name', dataIndex: 'companyName' },
    { title: 'Applied Date', dataIndex: 'appliedDate' },
  ]

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
      <Table
        columns={columns}
        dataSource={appliedJobs}
        rowKey={() => Math.random().toString(10).slice(4)}
      />
    </Pagelayout>
  )
}

export default Appliedjobs
