const ChartReducer = (state, action) => {
  switch (action.type) {
    case "INSERT_WL_DATA":
      return {
        ...state,
        wlmeter: action.datas.wlmeter,
        date: action.datas.date,
        aveWlMeter: action.datas.aveWlMeter / action.datas.wlmeter.length
      }
      break
    case "FILTER":
      return {
        ...state,
        fromUnix: action.fromUnix,
        toUnix: action.toUnix
      }
      break

    default:
      return { ...state }
      break
  }
}
export default ChartReducer
