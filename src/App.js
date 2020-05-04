import React from 'react'

import { Form, Input, Select, RichText, ArrayOf, If, logger } from './lib'

const App = () => {
  const defaultValues = JSON.parse(localStorage.getItem('@nave-form:data'))

  const onSubmit = data => {
    logger.json(data)
    localStorage.setItem('@nave-form:data', JSON.stringify(data))
  }

  const options = [
    { name: 'Eduardo', value: 1 },
    { name: 'Pedro', value: 2 },
    { name: 'Letícia', value: 3 }
  ]

  return (
    <Form onSubmit={onSubmit} {...(defaultValues && { defaultValues })} unmask>
      <RichText name='description' placeholder='Digite aqui...' required='Campo obrigatório' label='Descrição' />
      <Input name='cpf' pattern='cpf' required='Campo obrigatório' placeholder='000.000.000-00' label='CPF' />
      <Select options={options} name='people' accessor='name' label='Irmão' required='Campo obrigatório' />
      <Input name='cnpj' pattern='cnpj' required='Campo obrigatório' placeholder='00.000.000/0000-00' label='CNPJ' />
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
