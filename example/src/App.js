import React from 'react'
import { Form, Input, If, ArrayOf } from 'nave-form'

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
      <Input name='zipCode' pattern='zipCode' required='Campo obrigatório' placeholder='00000-000' label='CEP' />
      <If conditions={[{ cpf: '042.104.390-37' }]}>
        <Input
          name='amount'
          pattern='currency'
          required='Campo obrigatório'
          placeholder='R$ 0.000,00'
          label='Patrimônio'
        />
      </If>
      <ArrayOf name='pets'>
        <Input name='name' required='Campo obrigatório' placeholder='Tobias Bittencourt' label='Nome do Pet' />
        <Input name='specie' required='Campo obrigatório' placeholder='Cachorro' label='Espécie' />
        <Input name='cpf' pattern='cpf' required='Campo obrigatório' placeholder='000.000.000-00' label='CPF' />
      </ArrayOf>

      <button type='submit'>submit</button>
    </Form>
  )
}

export default App
