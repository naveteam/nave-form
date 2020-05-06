import React from 'react'

import Form from './form'
import { NFormProvider } from '../../store'

const FormContext = props => (
  <NFormProvider>
    <Form {...props} />
  </NFormProvider>
)

export default FormContext
