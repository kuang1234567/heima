import request from '@/utils/request'
// 我的频道
export const getMyChnnels = () => {
  return request({
    url: 'user/channels'
  })
}
// 所有的频道
export const getAllChnnels = () => {
  return request({
    url: 'channels'
  })
}

// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}

// 频道数据持久化
export const saveChannels = (channels) => {
  return request({
    method: 'PUT',
    url: 'user/channels',
    data: {
      channels
    }
  })
}
