import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {
    const {dispatch} = useAuthContext();

    const logout= () => {
        console.log("logout called")
        localStorage.removeItem('user')

        //dispatch action 
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}