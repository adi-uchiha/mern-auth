

export const AuthContext = useContext()

export const authReducer = (state, action)=>{
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null 
    })

    console.log('AuthContextState:', state)

    return (
        <AuthContextProvider value = {{...state, dispatch}}>
            {children}
        </AuthContextProvider>
    )
}

