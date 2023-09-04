export const initialState = {
    doctor: null,
    user:null,
  };

  const reducer=(state,action)=>{
    switch(action.type){
        case "SET_USER":
        return{
          ...state,
          user:action.user
        }
        case "SET_DOCTOR":
            return{
                ...state,
                doctor:action.doctor
            }
        default :
        return state;
    }
  };
  export default reducer;