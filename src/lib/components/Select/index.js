import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { styled } from '@material-ui/core/styles'

import { validations, values } from '../../helpers'

const Select = ({ options, name, accessor, label, required, pattern, validate, defaultValue = null }) => {
  const { errors } = useFormContext()

  return (
    <Controller
      as={Autocomplete}
      name={name}
      options={options}
      onChange={([e, value]) => value}
      getOptionLabel={option => option[accessor]}
      getOptionSelected={(option, value) => option.value === value.value}
      defaultValue={defaultValue}
      renderInput={params => (
        <StyledTextField
          error={!!values.get(errors, name)?.message}
          helperText={values.get(errors, name)?.message}
          label={label}
          {...params}
        />
      )}
      rules={{
        ...(required && { required }),
        ...((pattern || validate) && { validate: validations[pattern || validate] })
      }}
    />
  )
}

const StyledTextField = styled(TextField)({
  '& input:-webkit-autofill': {
    'transition-delay': '99999s',
    '-webkit-transition-delay': '99999s'
  }
})

export default Select
