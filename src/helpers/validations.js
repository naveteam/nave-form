const validations = {
  date: value => {
    const [day, month, year] = value.split('/').map(number => parseInt(number))

    if (year < 1500 || year > 2500) return 'Ano inválido'

    if (month < 0 || month > 12) return 'Mês inválido'

    if (([1, 3, 5, 7, 8, 10, 12].includes(month) && day > 31) || ([4, 6, 9, 11].includes(month) && day > 30))
      return 'Dia inválido'

    if (month === 2) {
      if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        if (day > 29) return 'Dia inválido aqui'
      } else {
        if (day > 28) return 'Dia inválido'
      }
    }
  },
  cpf: value => {
    const mod11 = num => num % 11
    const isEqual = a => b => b === a
    const mergeDigits = (num1, num2) => `${num1}${num2}`
    const getTwoLastDigits = cpf => `${cpf[9]}${cpf[10]}`
    const getCpfNumeral = cpf => cpf.substr(0, 9).split('')

    const isRepeatingChars = str => str.split('').every(elem => elem === str[0])

    const toSumOfProducts = multiplier => (result, num, i) => result + num * multiplier--

    const getSumOfProducts = (list, multiplier) => list.reduce(toSumOfProducts(multiplier), 0)

    const getValidationDigit = multiplier => cpf => getDigit(mod11(getSumOfProducts(cpf, multiplier)))

    const getDigit = num => (num > 1 ? 11 - num : 0)

    const isRepeatingNumbersCpf = isRepeatingChars

    const isValidCPF = cpf => {
      const CPF = getCpfNumeral(cpf)
      const firstDigit = getValidationDigit(10)(CPF)
      const secondDigit = getValidationDigit(11)(CPF.concat(firstDigit))

      return isEqual(getTwoLastDigits(cpf))(mergeDigits(firstDigit, secondDigit))
    }

    if (isRepeatingNumbersCpf(value.replace(/\D/g, '')) || !isValidCPF(value.replace(/\D/g, ''))) {
      return 'CPF Inválido'
    }
  },
}

export default validations
