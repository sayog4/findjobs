import { message, Spin } from 'antd'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Pagelayout from '../../components/Pagelayout'
import PostEditJob from '../../components/Post-Edit-Job'
import { useJobDetail } from './hooks/useJob'

function Editjob({ match }: RouteComponentProps<{ id: string }>) {
  const { data, isError, isLoading, error } = useJobDetail(match.params.id)

  const [errors, setErrors] = React.useState<any>()
  const [companyInfo, setCompanyInfo] = React.useState({})
  const [activeTab, setActiveTab] = React.useState('0')

  function companyFormFinish(values: any) {
    setCompanyInfo(values)
    setActiveTab('1')
  }
  function finalFormFinish(values: any) {
    setErrors({})
    const obj = {
      ...companyInfo,
      ...values,
    }
    console.log(obj)
  }
  function changeTab(value: string) {
    setActiveTab(value)
  }

  React.useEffect(() => {
    if (isError) {
      let err = error as any
      setErrors(err?.response?.data?.errors)
      message.error('check previous and current tab for errors')
    }
  }, [error, isError])

  return (
    <Pagelayout>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <PostEditJob
          errors={errors}
          activeTab={activeTab}
          finalFormFinish={finalFormFinish}
          changeTab={changeTab}
          companyFormFinish={companyFormFinish}
          edit={true}
          job={data}
        />
      )}
    </Pagelayout>
  )
}

export default Editjob
