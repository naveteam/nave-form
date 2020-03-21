import React from 'react'
import { Helmet } from 'react-helmet'
import { createGlobalStyle } from 'styled-components'
import { useForm, FormContext } from 'react-hook-form'

import { masks } from '../helpers'
import { forceArray } from '../utils'

const Form = ({ defaultValues, children, onSubmit, unmask }) => {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  const GlobalStyle = createGlobalStyle`
    .form {
      font-family: 'Roboto', sans-serif;
    }
  `

  const prepareSubmit = values => {
    if (unmask) {
      const testMasks = (children, parent) =>
        children.reduce(
          (acc, child) =>
            ['If', 'ArrayOf'].includes(child.type.name)
              ? { ...acc, ...testMasks(forceArray(child.props.children), child.props?.name) }
              : {
                  ...acc,
                  ...((child.props.pattern || child.props.mask) && {
                    [`${parent ? `${parent}.` : ''}${child.props.name}`]: child.props.pattern || child.props.mask,
                  }),
                },
          {},
        )

      const unmasks = testMasks(children)

      const unmasked = (values, parent) =>
        Object.keys(unmasks).length
          ? Object.entries(values).reduce(
              (acc, [key, value]) =>
                Array.isArray(value)
                  ? {
                      ...acc,
                      [key]: [...value.map(single => unmasked(single, key))],
                    }
                  : {
                      ...acc,
                      [key]: masks.remove[unmasks[`${parent ? `${parent}.` : ''}${key}`]]
                        ? masks.remove[unmasks[`${parent ? `${parent}.` : ''}${key}`]](value)
                        : value,
                    },
              {},
            )
          : values

      onSubmit(unmasked(values))
    } else {
      onSubmit(values)
    }
  }

  return (
    <FormContext {...methods}>
      <Helmet>
        <link href='https://fonts.googleapis.com/css?family=Roboto&display=swap' rel='stylesheet' />
      </Helmet>
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
      <GlobalStyle />
    </FormContext>
  )
}

export default Form
