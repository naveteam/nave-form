import React from 'react'

import nFormReducers from './reducers'
import nFormActions from './actions'

const NFormStateContext = React.createContext()
const NFormDispatchContext = React.createContext()

const NFormProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(nFormReducers, { count: 0 })

  return (
    <NFormStateContext.Provider value={state}>
      <NFormDispatchContext.Provider value={dispatch}>{children}</NFormDispatchContext.Provider>
    </NFormStateContext.Provider>
  )
}

const useNFormState = () => {
  const context = React.useContext(NFormStateContext)

  if (context === undefined) {
    throw new Error('useNFormState must be used within a NFormProvider')
  }

  return context
}

const useNFormDispatch = () => {
  const context = React.useContext(NFormDispatchContext)

  if (context === undefined) {
    throw new Error('useNFormDispatch must be used within a NFormProvider')
  }

  return context
}

const useNForm = () => ({ store: useNFormState(), control: useNFormDispatch() })

export { NFormProvider, useNForm, nFormActions }
