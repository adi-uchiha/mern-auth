import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext";


export const useLogout = () => {
    const {dispatch} = useAuthContext();

    const { dispatch: workoutDispatch } = useWorkoutsContext()

    const logout= () => {
        console.log("logout called")
        localStorage.removeItem('user')

        //dispatch action 
        dispatch({type: 'LOGOUT'})

        workoutDispatch({
            type: 'SET_WORKOUTS', payload: null
        })
    }

    return {logout}
}