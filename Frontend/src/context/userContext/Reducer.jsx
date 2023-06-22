
const Reducer = (state, action) => {
    switch (action.type) {

        case "Signin successful":
            return {
                user: action.payload,
            }
            case "Signin failed":
                return {
                    user:null
                }
                case "Signout":
                    return {
                        user:null
                    }
                default:
                    return state;
                
    }
}

export default Reducer;