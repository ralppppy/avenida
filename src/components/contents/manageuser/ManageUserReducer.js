const ManageUserReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      console.log(state, action.users)
      return [...action.users]
      break

    default:
      break
  }
}

export default ManageUserReducer
