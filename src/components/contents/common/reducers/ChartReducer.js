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
      case "INSERT_ALL_DATA":
         console.log(action)
         let d = action.allData
         return { ...state, dateAndData: [...d] }

      default:
         return { ...state }
   }
}
export default ChartReducer
