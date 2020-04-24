const values = {
  get: (source, path) => {
    const dive = Array.isArray(path) ? path : path.split('.')
    return dive.reduce((acc, item) => acc[item] || [], source)
  },
  set: (source, path, value) => {
    const [dive, ...rest] = Array.isArray(path) ? path : path.split('.')
    if (dive) {
      if (!rest.length) {
        return (source[dive] = value)
      }
      return values.set(source[dive], rest, value)
    }
  }
}

export default values
