import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import { validations, values } from '../../helpers'

const Select = ({ options, name, accessor, label, required, pattern, validate }) => {
  const { errors } = useFormContext()

  return (
    <Controller
      as={Autocomplete}
      name={name}
      options={options}
      getOptionLabel={option => option[accessor]}
      getOptionSelected={(option, value) => option.value === value.value}
      renderInput={params => (
        <TextField
          error={!!values.get(errors, name)?.message}
          helperText={values.get(errors, name)?.message}
          label={label}
          {...params}
        />
      )}
      onChange={([e, value]) => value}
      rules={{
        ...(required && { required }),
        ...((pattern || validate) && { validate: validations[pattern || validate] })
      }}
      defaultValue={null}
    />
  )
}

export default Select
