import { message, Spin } from 'antd'
import { useQueryClient } from 'react-query'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Pagelayout from '../../components/Pagelayout'
import PostEditJob from '../../components/Post-Edit-Job'
import { useJobDetail, useUpdateJob } from './hooks/useJob'
import { queryKeys } from '../../reqct-query/constants'

function Editjob({ match }: RouteComponentProps<{ id: string }>) {
  const { data, isError, isLoading, error } = useJobDetail(match.params.id)

  const queryClient = useQueryClient()

  const {
    mutate,
    isError: mIsError,
    isLoading: mLoading,
    error: mError,
  } = useUpdateJob()

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
      _id: data?._id,
    }
    mutate(obj, {
      onSuccess: () => {
        message.success('Updated successfully')
        queryClient.invalidateQueries([queryKeys.job, data?._id])
        setActiveTab('0')
      },
    })
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

  React.useEffect(() => {
    if (mIsError) {
      let err = mError as any
      setErrors(err?.response?.data?.errors)
      message.error('check previous and current tab for errors')
    }
  }, [mError, mIsError])

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
          isUpdating={mLoading}
        />
      )}
    </Pagelayout>
  )
}

export default Editjob
