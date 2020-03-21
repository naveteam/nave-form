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
  cnpj: value => {
    const cnpj = value.replace(/[^\d]+/g, '')

    if (cnpj.length !== 14) return 'CNPJ inválido'

    if (/^(\d)\1+$/.test(cnpj)) return 'CNPJ inválido'

    const t = cnpj.length - 2
    const d = cnpj.substring(t)
    const d1 = parseInt(d.charAt(0))
    const d2 = parseInt(d.charAt(1))

    const calc = x => {
      let n = cnpj.substring(0, x)
      let y = x - 7
      let s = 0
      let r = 0

      for (let i = x; i >= 1; i--) {
        s += n.charAt(x - i) * y--
        if (y < 2) y = 9
      }

      r = 11 - (s % 11)
      return r > 9 ? 0 : r
    }
    return (calc(t) === d1 && calc(t + 1) === d2) || 'CNPJ Inválido'
  },
  zipCode: value => {
    return new RegExp(/^[0-9]{5}-[0-9]{3}$/).test(value)
  },
}

export default validations
