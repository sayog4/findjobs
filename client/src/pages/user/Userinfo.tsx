import { Spin, Typography } from 'antd'
import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { RouteComponentProps } from 'react-router-dom'
import Pagelayout from '../../components/Pagelayout'
import { useUserInfo } from './hooks/userUser'
import Pdfinfo from '../../components/Pdfinfo'

const { Title } = Typography

function UserInfo({ match }: RouteComponentProps<{ id: string }>) {
  const { data, error, isLoading, isError } = useUserInfo(match.params.id)
  console.log(data)
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
      <PDFViewer>
        <Pdfinfo data={data} />
      </PDFViewer>
    </Pagelayout>
  )
}

export default UserInfo
