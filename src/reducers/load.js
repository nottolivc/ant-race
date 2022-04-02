export const LOAD = "@@LOAD";

export const reducer = (state={}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        data: action.data
      }
    default:
      return state
  }
}

export const load = data => ({ type: LOAD, data })
