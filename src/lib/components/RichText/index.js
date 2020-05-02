import React from 'react'
import styled from 'styled-components'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { Controller, useFormContext } from 'react-hook-form'
import { IconButton } from '@material-ui/core'
import { FormatBold, FormatItalic, FormatUnderlined } from '@material-ui/icons'

const RichText = ({ name, placeholder }) => {
  const { setValue, getValues } = useFormContext()

  const handleKeyCommand = (command, editorState) => {
    try {
      if (['bold', 'italic', 'underline'].includes(command)) {
        setValue(name, RichUtils.handleKeyCommand(editorState, command))
        return 'handled'
      }
    } catch {
      return 'not-handled'
    }
  }

  const styleText = mode => {
    setValue(name, RichUtils.toggleInlineStyle(getValues()[name], mode.toUpperCase()))
  }

  return (
    <>
      <div>
        <IconButton size='small' onClick={() => styleText('bold')} component='span'>
          <FormatBold />
        </IconButton>
        <IconButton size='small' onClick={() => styleText('italic')} component='span'>
          <FormatItalic />
        </IconButton>
        <IconButton size='small' onClick={() => styleText('underline')} component='span'>
          <FormatUnderlined />
        </IconButton>
      </div>
      <Controller
        as={props => (
          <ContainerEditor>
            <Editor {...props} placeholder={placeholder} />
          </ContainerEditor>
        )}
        name={name}
        valueName='editorState'
        defaultValue={EditorState.createEmpty()}
        handleKeyCommand={handleKeyCommand}
        onChange={([value]) => value}
      />
    </>
  )
}

const ContainerEditor = styled.div`
  .DraftEditor-root {
    border-radius: 5px;
    position: relative;
    font-family: 'Roboto', sans-serif;
  }
  .public-DraftEditorPlaceholder-root {
    color: rgba(0, 0, 0, 0.54);
    position: absolute;
    pointer-events: none;
    padding: 5px;
  }
  .DraftEditor-editorContainer {
    padding: 5px;
    border-bottom: 1px solid black;
  }
  .public-DraftEditor-content {
    min-height: 100px;
  }
`

export default RichText
