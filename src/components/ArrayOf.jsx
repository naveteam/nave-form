import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { forceArray } from '../utils'

const ArrayOf = ({ name, addText = '+', removeText = '-', children, className }) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name })

  return (
    <div className={className}>
      {fields.map((item, index) => {
        return (
          <fieldset key={item.id}>
            {forceArray(children).map(child =>
              child.props.name
                ? React.createElement(child.type, {
                    ...{
                      ...child.props,
                      key: `${item.id}-${child.props.name}`,
                      name: `${name}.${index}.${child.props.name}`
                    }
                  })
                : child
            )}
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

export default ArrayOf
