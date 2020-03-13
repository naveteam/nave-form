import React, { useState, useMemo, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { masks, values, validations } from '../helpers'

const Input = ({ name, required, validate, mask, pattern, label, placeholder, className }) => {
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState('')
  const { register, setValue, errors, triggerValidation } = useFormContext()

  const mountClassName = useCallback(() => {
    const classArr = []

    className && classArr.push(className)
    touched && classArr.push('touched')
    error && classArr.push('error')

    return classArr.join(' ')
  }, [className, touched, error])

  const onBlur = useCallback(() => {
    setTouched(true)
    triggerValidation()
    setError(values.get(errors, name)?.message)
  }, [])

  const onChange = useCallback(
    e => {
      mask || pattern
        ? setValue(name, masks[mask || pattern](e.target.value), true)
        : setValue(name, e.target.value, true)
      triggerValidation()
      setError(values.get(errors, name)?.message)
    },
    [mask, setValue, name, pattern],
  )

  const ref = register({
    ...(required && { required }),
    ...((pattern || validate) && { validate: validations[pattern || validate] }),
  })

  return useMemo(
    () => (
      <div className={mountClassName()}>
        {label && <label>{label}</label>}
        <input
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          style={{ display: 'block' }}
          placeholder={placeholder}
        />
        {touched && error && <span>{error}</span>}
      </div>
    ),
    [name, onChange, placeholder, register, required, validate, touched, pattern, label, error, mountClassName],
  )
}

export default Input
