export const changeName =(name:string|null|undefined)=>({
    type: 'SET_NAME',
    payload: name,
});
export const changeEmail =(email:string|null|undefined)=>({
    type: 'SET_EMAIL',
    payload: email,
});
export const changeAvatar =(avatar:string|null|undefined)=>({
    type: 'SET_AVATAR',
    payload: avatar,
});

