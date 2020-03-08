# nave-form

>

[![NPM](https://img.shields.io/npm/v/nave-form.svg)](https://www.npmjs.com/package/nave-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save nave-form
```

## Usage

```jsx
import React from 'react'
import { Form, Input, If } from 'nave-form'

const App = () => {
  const onSubmit = data => console.log(data)

  return (
    <Form onSubmit={onSubmit} unmask>
      <Input name='cpf' pattern='cpf' required='Campo obrigatório' placeholder='000.000.000-00' label='CPF' />
      <Input
        name='bornDate'
        mask='date'
        validate='date'
        required='Campo obrigatório'
        placeholder='00/00/0000'
        label='Data de Nascimento'
      />
      <If conditions={[{ cpf: '042.104.390-37' }]}>
        <Input
          name='amount'
          pattern='currency'
          required='Campo obrigatório'
          placeholder='R$ 0.000,00'
          label='Patrimônio'
        />
      </If>

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

## License

MIT © [Eduardobittencourt08](https://github.com/Eduardobittencourt08)
