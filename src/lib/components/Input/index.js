import React from 'react'
import { TextField } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

import { masks, values, validations } from '../../helpers'

const Input = ({ name, required, validate, mask, pattern, label, placeholder, className }) => {
  const { errors } = useFormContext()

  return (
    <Controller
      as={TextField}
      name={name}
      label={label}
      placeholder={placeholder}
      className={className}
      error={!!values.get(errors, name)?.message}
      helperText={values.get(errors, name)?.message}
      rules={{
        ...(required && { required }),
        ...((pattern || validate) && {
          validate: validations[pattern || validate]
        })
      }}
      onChange={([event]) => (mask || pattern ? masks[mask || pattern](event.target.value) : event.target.value)}
      defaultValue=''
    />
  )
}

export default Input
