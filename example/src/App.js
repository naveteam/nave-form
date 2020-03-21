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
