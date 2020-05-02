import React from 'react'
import { Editor, EditorState } from 'draft-js'
import { Controller } from 'react-hook-form'

const RichText = ({ name }) => {
  return (
    <Controller
      as={Editor}
      name={name}
      valueName='editorState'
      defaultValue={EditorState.createEmpty()}
      onChange={([value]) => value}
    />
  )
}

export default RichText
