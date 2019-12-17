const display = (state = {filter: ''}, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    default:
      return state
  }
}

export default display