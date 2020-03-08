import React, { useMemo, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { masks, values, validations } from '../helpers'

const Input = ({ name, required, validate, mask, pattern, label, ...props }) => {
  const {
    register,
    setValue,
    errors,
    formState: { touched },
  } = useFormContext()

  const onChange = useCallback(
    e => {
      mask || pattern
        ? setValue(name, masks[mask || pattern](e.target.value), true)
        : setValue(name, e.target.value, true)
    },
    [mask, setValue, name, pattern],
  )

  return useMemo(
    () => (
      <div>
        {label && <label>{label}</label>}
        <input
          name={name}
          ref={register({
            ...(required && { required }),
            ...((pattern || validate) && { validate: validations[pattern || validate] }),
          })}
          onChange={onChange}
          style={{ display: 'block' }}
          {...props}
        />
        <span>{!Array.isArray(values.get(touched, name)) && values.get(errors, name)?.message}</span>
      </div>
    ),
    [name, onChange, props, register, errors, required, validate, touched, pattern, label],
  )
}

export default Input
