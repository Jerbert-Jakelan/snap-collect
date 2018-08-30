const initialState = {
  user: {},
  selectedCollection:null
}

const SET_USER = 'SET_USER';
const SELECT_COLLECTION = 'SELECT_COLLECTION';


export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const selectCollection = (collection_id) => {
  return {
    type: SELECT_COLLECTION,
    payload: collection_id
  }
}

const reducer = (state = initialState, action) => {
  console.log(action);
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
      case SELECT_COLLECTION:
      return {
        ...state,
        selectedCollection: action.payload
      }
    default:
      return state;
  }
}

export default reducer;