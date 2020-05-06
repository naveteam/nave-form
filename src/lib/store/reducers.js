export default (state, action) => {
  switch (action.type) {
    case 'increment': {
      return { count: state.count + action.payload }
    }
    case 'decrement': {
      return { count: state.count - action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
