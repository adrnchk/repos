const initialState = {
    name: "",
    email: "",
    avatar: "../resourses/img/user.svg"

};
// interface IInfo
// {
//     name: string | null;
//     email: string | null;
//     avatar: string | null;
// }
// interface IAction
// {
    
//         type: string,
//         payload: string,
    
// }
const userInfo=(state = initialState, action)=>{
    if(action.type==="SET_NAME"){
        return{
            ...state,
            name: action.payload,
        };
    }
    if(action.type==="SET_EMAIL"){
        return{
            ...state,
            email: action.payload,
        };
    }
    if(action.type==="SET_AVATAR"){
        return{
            ...state,
            avatar: action.payload,
        };
    }
    return state;
    
};
export default userInfo;