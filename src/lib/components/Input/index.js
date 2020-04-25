import React from 'react'
import { TextField } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { useFormContext, Controller } from 'react-hook-form'

import { masks, values, validations } from '../../helpers'

const Input = ({ name, required, validate, mask, pattern, label, placeholder, className, defaultValue = '' }) => {
  const { errors } = useFormContext()

  return (
    <Controller
      fullWidth
      as={StyledTextField}
      name={name}
      label={label}
      placeholder={placeholder}
      className={className}
      defaultValue={defaultValue}
      error={!!values.get(errors, name)?.message}
      helperText={values.get(errors, name)?.message}
      rules={{
        ...(required && { required }),
        ...((pattern || validate) && {
          validate: validations[pattern || validate]
        })
      }}
      onChange={([event]) => (mask || pattern ? masks[mask || pattern](event.target.value) : event.target.value)}
    />
  )
}

const StyledTextField = styled(TextField)({
  '& input:-webkit-autofill': {
    'transition-delay': '99999s',
    '-webkit-transition-delay': '99999s'
  }
})

export default Input
