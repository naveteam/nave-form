import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { useFormContext } from 'react-hook-form'

import { masks, values, validations } from '../helpers'
import { colors } from '../constants'

const Input = ({ name, required, validate, mask, pattern, label, placeholder, className, variant }) => {
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState('')
  const { register, setValue, errors, triggerValidation } = useFormContext()

  const mountClassName = useCallback(() => {
    const classArr = []

    className && classArr.push(className)
    variant && classArr.push(variant)
    touched && classArr.push('touched')
    error && classArr.push('error')

    return classArr.join(' ')
  }, [className, touched, error, variant])

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
      <Styles className={mountClassName()}>
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
      </Styles>
    ),
    [name, onChange, placeholder, register, required, validate, touched, pattern, label, error, mountClassName],
  )
}

const Styles = styled.div`
  &.material {
    input {
      border: 0;
      border-bottom: 1px solid ${colors.grey};
      outline: none;
      transition: all 0.2s ease-in-out;
      &:hover,
      &:focus {
        border-bottom: 2px solid ${colors.black};
      }
      &:-webkit-autofill {
        transition-delay: 99999s;
        -webkit-transition-delay: 99999s;
      }
    }
    &.error {
      input {
        border-bottom: 2px solid ${colors.red};
      }
      label {
        color: ${colors.red};
      }
      span {
        color: ${colors.red};
      }
    }
  }
`

export default Input
