export const addCount = (count, dispatch) => {
  dispatch({
    type: 'increment',
    payload: count
  })
}

export const subCount = (count, dispatch) => {
  dispatch({
    type: 'decrement',
    payload: count
  })
}

export default () => ({ addCount, subCount })
