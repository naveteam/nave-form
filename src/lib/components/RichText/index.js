import React, { useState, useEffect } from 'react'
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { useFormContext } from 'react-hook-form'

const RichText = ({ name }) => {
  const [internalValue, setInternalValue] = useState(null)
  const { register, unregister, setValue, watch } = useFormContext()
  const val = watch(name)

  useEffect(() => {
    register({ name })
    return () => unregister(name)
  }, [])

  useEffect(() => {
    if (val) {
      setInternalValue(EditorState.createWithContent(convertFromRaw(val)))
    } else {
      setInternalValue(EditorState.createEmpty())
    }
  }, [])

  useEffect(() => {
    if (internalValue) {
      setValue(name, convertToRaw(internalValue.getCurrentContent()))
    }
  }, [internalValue])

  return internalValue ? <Editor editorState={internalValue} onChange={setInternalValue} /> : ''
}

export default RichText
