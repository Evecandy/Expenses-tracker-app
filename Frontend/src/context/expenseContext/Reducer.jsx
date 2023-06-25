
const Reducer = (state, action) => {
    switch (action.type) {

        case "Dashboard":
            return {
                ui: action.payload
            }
        case "Update":
            return {
                ui: action.payload
            }
        case "Delete":
            return {
                ui: action.payload
            }
            

        default:
            return state;
    }
}

export default Reducer;