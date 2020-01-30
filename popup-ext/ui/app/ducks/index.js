export default rootReducer

function rootReducer (state, action) {
  // clone
  state = { ...state }

  if (action.type === 'GLOBAL_FORCE_UPDATE') {
    return action.value
  }

  //
  // Send
  //
  return state
}