import React from 'react'
import PropTypes from 'prop-types'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { forceArray } from '../../utils'

const ArrayOf = ({ name, addText = '+', removeText = '-', children, className }) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name })
  const leafs = ['Input', 'Select']

  const renderFields = ({ children, index }) =>
    children.reduce((acc, child) => {
      if (typeof child === 'object') {
        const fieldName = `${name}.${index}.${child.props.name}`
        const component = child.type.name

        if (leafs.includes(component)) {
          return [
            ...acc,
            {
              ...child,
              props: {
                ...child.props,
                name: fieldName
              }
            }
          ]
        }

        if (child.props.children) {
          const children = forceArray(child.props.children)
          return [...acc, ...renderFields({ children, index })]
        }
      }
      return acc
    }, [])

  return (
    <div className={className}>
      {fields.map((item, index) => {
        return (
          <fieldset key={item.id}>
            {renderFields({ children: forceArray(children), index })}
            <button onClick={() => remove(index)}>{removeText}</button>
          </fieldset>
        )
      })}
      <button type='button' onClick={() => append({ name })}>
        {addText}
      </button>
    </div>
  )
}

ArrayOf.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  addText: PropTypes.string,
  removeText: PropTypes.string,
  className: PropTypes.string
}

export default ArrayOf
