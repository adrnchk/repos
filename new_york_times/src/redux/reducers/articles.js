const initialState = {
    items:[],

};
const articles=(state = initialState, action)=>{
    if(action.type==="SET_ARTICLES"){
        return{
            ...state,
            items: action.payload,
        };
    }
    return state;    
};
export default articles;