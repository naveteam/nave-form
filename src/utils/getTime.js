const now = new Date()

export const getTime = `${now.getHours() < 10 ? '0' : ''}${now.getHours()}:${
  now.getMinutes() < 10 ? '0' : ''
}${now.getMinutes()}:${now.getSeconds() < 10 ? '0' : ''}${now.getSeconds()}`
