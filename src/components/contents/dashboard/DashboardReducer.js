const DashboardReducer = (state, action) => {
   switch (action.type) {
      case "CHART_VISIBILITY_TOGGLE":
         return { ...state, chartVisible: !state.chartVisible }

      default:
         return { ...state }
         break
   }
}
export default DashboardReducer
