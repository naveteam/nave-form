import React from 'react'
import { useForm, FormContext } from 'react-hook-form'

import { masks } from '../helpers'
import { forceArray } from '../utils'

const Form = ({ defaultValues, children, onSubmit, unmask }) => {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  const prepareSubmit = values => {
    if (unmask) {
      const testMasks = children =>
        children.reduce((acc, child) => {
          if (child.type.name === 'If') {
            return { ...acc, ...testMasks(forceArray(child.props.children)) }
          }
          return {
            ...acc,
            ...((child.props.pattern || child.props.mask) && {
              [child.props.name]: child.props.pattern || child.props.mask,
            }),
          }
        }, {})

      const unmasks = testMasks(children)

      const newValues = Object.keys(unmasks).length
        ? Object.entries(values).reduce((acc, [key, value]) => {
            return {
              ...acc,
              [key]: masks.remove[unmasks[key]] ? masks.remove[unmasks[key]](value) : value,
            }
          }, {})
        : values

      onSubmit(newValues)
    } else {
      onSubmit(values)
    }
  }

  return (
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(prepareSubmit)} className='form'>
        {Array.isArray(children)
          ? children.map(child => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      key: child.props.name,
                    },
                  })
                : child
            })
          : children}
      </form>
    </FormContext>
  )
}

export default Form
