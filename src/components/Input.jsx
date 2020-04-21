import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { useFormContext } from 'react-hook-form'

import { masks, values, validations } from '../helpers'
import { colors } from '../constants'

const Input = ({ name, required, validate, mask, pattern, label, placeholder, className, variant }) => {
  const [filled, setFilled] = useState(false)
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState('')
  const { register, setValue, errors, triggerValidation } = useFormContext()

  const mountClassName = useCallback(() => {
    const classArr = []

    className && classArr.push(className)
    variant && classArr.push(variant)

    touched && classArr.push('touched')
    filled && classArr.push('filled')
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
      e.target.value ? setFilled(true) : setFilled(false)
    },
    [mask, setValue, name, pattern]
  )

  const ref = register({
    ...(required && { required }),
    ...((pattern || validate) && { validate: validations[pattern || validate] })
  })

  return useMemo(
    () => (
      <Container className={mountClassName()}>
        <StyledInput name={name} ref={ref} onChange={onChange} onBlur={onBlur} placeholder={placeholder} />
        {label && <Label>{label}</Label>}
        {touched && error && <Error>{error}</Error>}
      </Container>
    ),
    [name, onChange, placeholder, register, required, validate, touched, pattern, label, error, mountClassName]
  )
}

const Container = styled.div`
  &.material {
    height: 50px;
    margin: 0;
    position: relative;
    width: 100%;
  }
`

const Label = styled.label`
  ${Container}.material & {
    position: absolute;
    pointer-events: none;
    transform-origin: top left;
    transition: all 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms;
    top: 10px;
  }
  ${Container}.material.filled & {
    transform: scale(0.75);
    top: 0;
  }
  ${Container}.material.error & {
    color: ${colors.material.red};
  }
`

const StyledInput = styled.input`
  ${Container}.material & {
    display: block;
    border: 0;
    border-bottom: 1px solid ${colors.material.grey};
    font-size: 14px;
    outline: none;
    position: absolute;
    transition: all 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms;
    top: 15px;
    width: 100%;
    &::placeholder {
      color: rgba(255, 255, 255, 0);
      transition: all 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms;
    }
    &:focus {
      + label {
        transform: scale(0.75);
        top: 0;
      }
      &::placeholder {
        color: rgba(0, 0, 0, 0.3);
      }
    }
    &:hover {
      border-bottom: 2px solid ${colors.material.black};
    }
    &:-webkit-autofill {
      transition-delay: 99999s;
      -webkit-transition-delay: 99999s;
    }
  }
  ${Container}.material.error & {
    border-bottom: 2px solid ${colors.material.red};
  }
`

const Error = styled.span`
  ${Container}.material & {
    bottom: 0;
    font-size: 12px;
    position: absolute;
  }
  ${Container}.material.error & {
    color: ${colors.material.red};
  }
`

export default Input
