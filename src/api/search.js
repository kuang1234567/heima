import request from '@/utils/request'

export const getSuggestList = (q) => {
  return request({
    url: 'suggestion',
    params: { q }
  })
}

export const getResultList = params => {
  return request({
    url: 'search',
    params
  })
}
