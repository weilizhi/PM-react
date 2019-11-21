//定义localStorage工具模块
//设置
export function setItem(key, value) {
  if (typeof value === 'object') {
    try {
      value = JSON.stringify(value)
    } finally { //finally 无论失败还是成功都会走进这个流程
      window.localStorage.setItem(key, value)
    }
  }
}
//获取
export function getItem(key) {
  const value = window.localStorage.getItem(key)
  //JSON 无法解析的时候需要用try catch来捕获错误，value如果是基本类型数据，调用JSON.parse 会报错，因为它只会解析对象或数组数据
  try {
    return JSON.parse(value);
  } catch {
    return value
  }
}

//删除 （不需要接收返回值）

export function removeItem(key) {
  window.localStorage.removeItem(key)
}