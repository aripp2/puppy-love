export const isLoading = (state=true, action) => {
  switch (action.type) {
    case 'UPDATE_LOADING':
      return action.bool
    default:
      return state
  }
}