import React from 'react'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'
import Pagelayout from '../../components/Pagelayout'
import { usePostJob } from './hooks/useJob'
import PostEditJob from '../../components/Post-Edit-Job'

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

  function changeTab(value: string) {
    setActiveTab(value)
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
      <PostEditJob
        errors={errors}
        changeTab={changeTab}
        activeTab={activeTab}
        companyFormFinish={companyFormFinish}
        finalFormFinish={finalFormFinish}
      />
    </Pagelayout>
  )
}
export default Postjob
