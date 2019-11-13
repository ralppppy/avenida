const LoginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: true }
      break
    case "INPUT":
      return { ...state, [action.field]: action.value }
      break

    default:
      break
  }
}

export default LoginReducer
