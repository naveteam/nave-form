import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { Controller, ErrorMessage, useFormContext } from 'react-hook-form'
import { IconButton as MaterialIconButton, Divider, FormHelperText } from '@material-ui/core'
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatQuote,
  FormatListBulleted,
  FormatListNumbered,
  Title,
  Code
} from '@material-ui/icons'

import { values } from '../../helpers'

const RichText = ({ name, required, label }) => {
  const { setValue, getValues, errors, watch } = useFormContext()
  const [currentInlineStyles, setCurrentInlineStyles] = useState([])
  const [currentBlockStyle, setCurrentBlockStyle] = useState([])

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

  const styleInline = mode => {
    const state = getValues()[name]
    const newState = RichUtils.toggleInlineStyle(state, mode.toUpperCase())
    setValue(name, newState)
    if (currentInlineStyles.includes(e => e === mode.toUpperCase())) {
      setCurrentInlineStyles(currentInlineStyles.filter(e => e !== mode.toUpperCase()))
      return
    }
    setCurrentInlineStyles([...currentInlineStyles, mode.toUpperCase()])
  }

  const styleBlock = mode => {
    const state = getValues()[name]
    const newState = EditorState.forceSelection(RichUtils.toggleBlockType(state, mode), state.getSelection())
    setValue(name, newState)
  }

  const ControlButton = ({ icon, scope, mode }) => {
    const onClick = e => {
      e.preventDefault()
      if (scope === 'inline') {
        styleInline(mode)
      }
      if (scope === 'block') {
        styleBlock(mode)
      }
    }
    return (
      <IconButton
        {...(currentInlineStyles.find(e => e === mode.toUpperCase()) && { isactive: true })}
        size='small'
        onMouseDown={onClick}
        component='span'
      >
        {React.createElement(icon)}
      </IconButton>
    )
  }

  return (
    <>
      <ControlsContainer>
        <ControlButton scope='inline' mode='bold' icon={FormatBold} />
        <ControlButton scope='inline' mode='italic' icon={FormatItalic} />
        <ControlButton scope='inline' mode='underline' icon={FormatUnderlined} />
        <Divider orientation='vertical' flexItem />
        <ControlButton scope='block' mode='header-one' icon={Title} />
        <ControlButton scope='block' mode='blockquote' icon={FormatQuote} />
        <ControlButton scope='block' mode='code-block' icon={Code} />
        <ControlButton scope='block' mode='unordered-list-item' icon={FormatListBulleted} />
        <ControlButton scope='block' mode='ordered-list-item' icon={FormatListNumbered} />
      </ControlsContainer>
      <EditorContainer error={!!values.get(errors, name)?.message}>
        <Controller
          as={Editor}
          name={name}
          valueName='editorState'
          placeholder={label}
          defaultValue={EditorState.createEmpty()}
          handleKeyCommand={handleKeyCommand}
          onChange={([value]) => {
            if (value) {
              setCurrentInlineStyles(value?.getCurrentInlineStyle().toJS())
            }
            return value
          }}
          rules={{ validate: value => !value.getCurrentContent().hasText() && required }}
        />
      </EditorContainer>
      <ErrorMessage as={FormHelperText} error={true} errors={errors} name={name} />
    </>
  )
}

const ControlsContainer = styled.div`
  display: flex;
  hr {
    margin: 0 5px;
  }
`

const EditorContainer = styled.div`
  .DraftEditor-root {
    position: relative;
    font-family: 'Roboto', sans-serif;
  }
  .public-DraftEditorPlaceholder-root {
    color: ${({ error }) => (error ? '#f44336' : 'rgba(0, 0, 0, 0.54)')};
    position: absolute;
    pointer-events: none;
    padding: 5px;
  }
  .DraftEditor-editorContainer {
    padding: 5px;
  }
  .public-DraftEditor-content {
    min-height: 100px;
    &:after {
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      position: absolute;
      transform: scaleX(0);
      transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
      border-bottom: 2px solid #3f51b5;
      pointer-events: none;
    }
    &:focus {
      &:after {
        transform: scale(1);
      }
    }
    ${({ error }) =>
      error &&
      `&:after {
        transform: scale(1);
        border-bottom-color: #f44336;
      }
    `}
    &:before {
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      position: absolute;
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      pointer-events: none;
    }
    &:hover {
      &:before {
        border-bottom: 2px solid rgba(0, 0, 0, 0.87);
      }
    }
  }
`

const IconButton = styled(MaterialIconButton)`
  ${({ isactive }) => isactive && 'background-color: blue !important;'}
`

export default RichText
