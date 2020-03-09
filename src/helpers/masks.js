const masks = {
  date: value => {
    const numbers = value.replace(/\D/g, '')

    switch (true) {
      case numbers.length <= 2:
        return numbers.replace(/(\d{2})/g, '$1')
      case numbers.length <= 4:
        return numbers.replace(/(\d{2})(\d{1,2})/g, '$1/$2')
      case numbers.length <= 8:
        return numbers.replace(/(\d{2})(\d{2})(\d{1,4})/g, '$1/$2/$3')
      default:
        return numbers.replace(/(\d{2})(\d{2})(\d{4})(.+?)/g, '$1/$2/$3')
    }
  },
  cpf: value => {
    const numbers = value.replace(/\D/g, '')

    switch (true) {
      case numbers.length <= 3:
        return numbers.replace(/(\d{3})/g, '$1')
      case numbers.length <= 6:
        return numbers.replace(/(\d{3})(\d{1,3})/g, '$1.$2')
      case numbers.length <= 9:
        return numbers.replace(/(\d{3})(\d{3})(\d{1,3})/g, '$1.$2.$3')
      case numbers.length <= 11:
        return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/g, '$1.$2.$3-$4')
      default:
        return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})(.+?)/g, '$1.$2.$3-$4')
    }
  },
  currency: value => {
    const numbers = value.replace(/\D/g, '')

    switch (true) {
      case numbers.length <= 0:
        return 'R$ 0,00'
      case `${parseInt(numbers)}`.length <= 1:
        return `R$ ${parseInt(numbers)}`.replace(/(\d{1,2})/g, '0,0$1')
      case `${parseInt(numbers)}`.length <= 2:
        return `R$ ${parseInt(numbers)}`.replace(/(\d{1,2})/g, '0,$1')
      default:
        return `R$ ${parseInt(numbers)}`.replace(/(\d+)(\d{2})/, '$1,$2').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
  },
  zipCode: value => {
    const numbers = value.replace(/\D/g, '')

    switch (true) {
      case numbers.length <= 5:
        return numbers
      case numbers.length <= 8:
        return numbers.replace(/(\d{5})(\d{1,3})/, '$1-$2')
      default:
        return numbers.replace(/(\d{5})(\d{1,3})(.+?)/, '$1-$2')
    }
  },
}

const remove = {
  date: value => {
    return value
      .split('/')
      .reverse()
      .join('-')
  },
  cpf: value => {
    return value.replace(/\D/g, '')
  },
  currency: value => {
    return value.replace(/\D/g, '')
  },
  zipCode: value => {
    return value.replace(/\D/g, '')
  },
}

export default { ...masks, remove }
