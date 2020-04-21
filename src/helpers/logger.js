import { environment, loggerColors } from '../constants'
import { getTime } from '../utils'

const mountMessage = (messages, action) => {
  const title = `[${action.toUpperCase()}] - ${getTime}`
  const backgroundColor = loggerColors?.actions[action]?.background
  const fontColor = loggerColors?.actions[action]?.font
  const environmentColor = loggerColors?.environments[environment]

  console.group(`%c${title}`, `background-color: ${backgroundColor}; color: ${fontColor}`)

  // Informations Group
  console.groupCollapsed('%cInformations', 'color: #177aad')
  console.log(`ENV: %c${environment}`, `color: ${environmentColor}`)
  console.trace()
  console.groupEnd()

  // Message Group
  console.group(`%cMessage${messages.length - 1 ? 's' : ''}`, 'color: #9d01ad')
  switch (action) {
    case 'log':
      messages.map(msg => console.log(msg))
      break
    case 'json':
      messages.map(msg => console.table(msg))
      break
    default:
      messages.map(msg => console.log(msg))
      break
  }
  console.groupEnd()

  console.groupEnd()
}

const methods = {
  log: (...messages) => mountMessage(messages, 'log'),
  json: (...messages) => mountMessage(messages, 'json')
}

const logger = {
  ...methods,
  prod: {
    ...Object.entries(methods).reduce((acc, [name, func]) => {
      return {
        ...acc,
        [name]: (...props) => environment === 'production' || func(...props)
      }
    }, {})
  }
}

export default logger
