import React from 'react'
import { useForm, FormContext } from 'react-hook-form'

import { masks } from '../../helpers'
import { forceArray } from '../../utils'

const Form = ({ defaultValues, children, onSubmit, unmask }) => {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  const prepareSubmit = values => {
    if (unmask) {
      const testMasks = (children, parent) => {
        return children.reduce((acc, child) => {
          if (['If', 'ArrayOf'].includes(child.type.name)) {
            return {
              ...acc,
              ...testMasks(forceArray(child.props.children), child.props?.name)
            }
          }
          const mountName = parent ? `${parent}.${child.props.name}` : child.props.name
          return {
            ...acc,
            ...((child.props.pattern || child.props.mask) && {
              [mountName]: child.props.pattern || child.props.mask
            })
          }
        }, {})
      }

      const unmasks = testMasks(children)

      const unmasked = (values, parent) =>
        Object.keys(unmasks).length
          ? Object.entries(values).reduce(
              (acc, [key, value]) =>
                Array.isArray(value)
                  ? {
                      ...acc,
                      [key]: [...value.map(single => unmasked(single, key))]
                    }
                  : {
                      ...acc,
                      [key]: masks.remove[unmasks[`${parent ? `${parent}.` : ''}${key}`]]
                        ? masks.remove[unmasks[`${parent ? `${parent}.` : ''}${key}`]](value)
                        : value
                    },
              {}
            )
          : values

      onSubmit(unmasked(values))
    } else {
      onSubmit(values)
    }
  }

  return (
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(prepareSubmit)}>
        {Array.isArray(children)
          ? children.map(child => {
              return child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      key: child.props.name
                    }
                  })
                : child
            })
          : children}
      </form>
    </FormContext>
  )
}

export default Form
