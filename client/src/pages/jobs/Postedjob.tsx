import { EditOutlined, OrderedListOutlined } from '@ant-design/icons'
import { Spin, Typography, Table, Modal } from 'antd'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Pagelayout from '../../components/Pagelayout'
import { PostedJobs } from '../../shared/types'
import { useGetPostedJobs } from './hooks/useJob'

const { Title } = Typography

function Postedjob() {
  const history = useHistory()
  const { data, isLoading, isError, error } = useGetPostedJobs()

  const [isModalVisible, setModalVisible] = React.useState(false)
  const [selectedJob, setSelectedJob] = React.useState<PostedJobs | null>(null)

  function showModal(data: PostedJobs) {
    setSelectedJob(data)
    setModalVisible(true)
  }

  function handleOk() {
    setModalVisible(false)
  }
  function handleCancel() {
    setModalVisible(false)
  }

  let errMsg = 'something went wrong'
  if (isError && error?.response?.data?.message) {
    errMsg = error?.response?.data?.message
  }

  const columns = [
    {
      titile: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
    },
    {
      title: 'Posted On',
      dataIndex: 'postedOn',
    },
    {
      title: 'Applied Candidates',
      dataIndex: 'appliedCandidates',
    },
    {
      title: 'Actions',
      render: (text: any, data: any) => (
        <div style={{ display: 'flex' }}>
          <EditOutlined
            style={{ fontSize: 22, margin: '5px' }}
            onClick={() => history.push(`/editjob/${data.jobData._id}`)}
          />
          <OrderedListOutlined
            style={{ fontSize: 22, margin: '5px' }}
            onClick={() => showModal(data.jobData)}
          />
        </div>
      ),
    },
  ]

  const dsrc: any[] = []
  data?.map((d) => {
    let obj = {
      title: d.title,
      companyName: d.companyName,
      postedOn: d.createdAt,
      appliedCandidates: d.appliedCandidates.length,
      jobData: d,
    }

    return dsrc.push(obj)
  })

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
        dataSource={dsrc}
        rowKey={(record) => record.postedOn}
      />
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        closable={false}
        title="Applied Candidates"
      >
        <Listcandidates selectedJob={selectedJob} />
      </Modal>
    </Pagelayout>
  )
}
interface PropsType {
  selectedJob: PostedJobs | null
}
function Listcandidates({ selectedJob }: PropsType) {
  const cols = [
    {
      title: 'Candidate Id',
      render: (text: any, data: any) => (
        <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>
      ),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
    },
  ]

  const dataSrc: any[] = []
  selectedJob?.appliedCandidates.map((d) => {
    let obj = {
      candidateId: d.userId._id,
      fullName: d.userId.firstName + ' ' + d.userId.lastName,
      appliedDate: d.appliedDate,
    }
    return dataSrc.push(obj)
  })

  return (
    <Table
      columns={cols}
      dataSource={dataSrc}
      rowKey={(record) => record.candidateId}
    />
  )
}

export default Postedjob