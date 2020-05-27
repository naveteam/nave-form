<p align="center">
  <a href="https://nave.rs/" rel="noopener" target="_blank"><img width="150" style="border-radius: 10px;" src="https://avatars3.githubusercontent.com/u/33161449?s=200&v=4" alt="Material-UI logo"></a></p>
</p>

<h1 align="center">Nave Form</h1>

<p align="center">Form creation made easy by <a href="https://nave.rs" target="_blank">Nave.rs</a>. This package is an abstraction of <a href="https://react-hook-form.com" target="_blank">react-hook-form</a>.</p>

[![NPM](https://img.shields.io/npm/v/nave-form.svg)](https://www.npmjs.com/package/nave-form)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Installation

```bash
npm install --save nave-form
```

## Usage

```jsx
import React from 'react'
import { Form, Input, If, ArrayOf } from 'nave-form'

const App = () => {
  const onSubmit = data => console.log(data)

  return (
    <Form onSubmit={onSubmit} unmask>
      <Input
        name='cpf'
        pattern='cpf'
        required='Campo obrigatório'
        placeholder='000.000.000-00'
        label='CPF'
        variant='material'
      />
      <Input
        name='cnpj'
        pattern='cnpj'
        required='Campo obrigatório'
        placeholder='00.000.000/0000-00'
        label='CNPJ'
        variant='material'
      />
      <Input
        name='bornDate'
        mask='date'
        validate='date'
        required='Campo obrigatório'
        placeholder='00/00/0000'
        label='Data de Nascimento'
        variant='material'
      />
      <Input
        name='zipCode'
        pattern='zipCode'
        required='Campo obrigatório'
        placeholder='00000-000'
        label='CEP'
        variant='material'
      />
      <If conditions={[{ cpf: '042.104.390-37' }]}>
        <Input
          name='amount'
          pattern='currency'
          required='Campo obrigatório'
          placeholder='R$ 0.000,00'
          label='Patrimônio'
          variant='material'
        />
      </If>
      <ArrayOf name='pets'>
        <Input
          name='name'
          required='Campo obrigatório'
          placeholder='Tobias Bittencourt'
          label='Nome do Pet'
          variant='material'
        />
        <Input name='specie' required='Campo obrigatório' placeholder='Cachorro' label='Espécie' variant='material' />
        <Input
          name='cpf'
          pattern='cpf'
          required='Campo obrigatório'
          placeholder='000.000.000-00'
          label='CPF'
          variant='material'
        />
      </ArrayOf>

      <button type='submit'>submit</button>
    </Form>
  )
}

export default App
```

This includes validations and masks (can be used separately with props `mask` and `validate` or together with `pattern` prop)

## Avaliable Input Patterns
- Date
- Currency
- CPF
- CNPJ
- Zip Code

## Other avaliable functions
- Unmask fields passing a prop `unmask` on Form
- Conditionally render fields using the `If` component
- Render arrays of fields using the `ArrayOf` component
- Render component material-like using the `variant` prop on `Input`

## License

MIT © [eduardobittencourt](https://github.com/eduardobittencourt)
