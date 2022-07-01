// localstorage获取数据
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}

// 保存数据
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

// 删除数据
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

// 删除所有
export function clearItem () {
  window.localStorage.clearItem()
}
