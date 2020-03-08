import React from 'react'
import { useFormContext } from 'react-hook-form'

const Select = ({ options, name, ...rest }) => {
  const { register } = useFormContext()
  return (
    <select name={name} ref={register} {...rest}>
      {options.map(value => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}

export default Select
