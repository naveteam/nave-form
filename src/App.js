import React from 'react'
import { Grid } from '@material-ui/core'

import { Form, Input, Select, RichText, ArrayOf, If, logger } from './lib'

const App = () => {
  const defaultValues = localStorage.getItem('@nave-form:data')

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
    <Form onSubmit={onSubmit} {...(defaultValues && { defaultValues: JSON.parse(defaultValues) })} unmask>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RichText name='Bio' required='Campo obrigatório' placeholder='Fale um pouco de você aqui...' />
        </Grid>
        <Grid item xs={6}>
          <Input
            name='cpf'
            pattern='cpf'
            required='Campo obrigatório'
            placeholder='000.000.000-00'
            label='CPF'
            variant='material'
          />
        </Grid>
        <Grid item xs={6}>
          <Select options={options} name='people' accessor='name' label='Irmão' required='Campo obrigatório' />
        </Grid>
        <Grid item xs={6}>
          <Input
            name='cnpj'
            pattern='cnpj'
            required='Campo obrigatório'
            placeholder='00.000.000/0000-00'
            label='CNPJ'
            variant='material'
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name='bornDate'
            mask='date'
            validate='date'
            required='Campo obrigatório'
            placeholder='00/00/0000'
            label='Data de Nascimento'
            variant='material'
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            name='zipCode'
            pattern='zipCode'
            required='Campo obrigatório'
            placeholder='00000-000'
            label='CEP'
            variant='material'
          />
        </Grid>
        <If conditions={[{ cpf: '042.104.390-37' }]}>
          <Grid item xs={6}>
            <Input
              name='amount'
              pattern='currency'
              required='Campo obrigatório'
              placeholder='R$ 0.000,00'
              label='Patrimônio'
              variant='material'
            />
          </Grid>
        </If>
        <Grid item xs={12}>
          <ArrayOf name='pets'>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Input
                  name='name'
                  required='Campo obrigatório'
                  placeholder='Tobias Bittencourt'
                  label='Nome do Pet'
                  variant='material'
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  name='specie'
                  required='Campo obrigatório'
                  placeholder='Cachorro'
                  label='Espécie'
                  variant='material'
                />
              </Grid>
              <Grid item xs={4}>
                <Input
                  name='cpf'
                  pattern='cpf'
                  required='Campo obrigatório'
                  placeholder='000.000.000-00'
                  label='CPF'
                  variant='material'
                />
              </Grid>
            </Grid>
          </ArrayOf>
        </Grid>
        <Grid item xs={12}>
          <button type='submit'>submit</button>
        </Grid>
      </Grid>
    </Form>
  )
}

export default App
