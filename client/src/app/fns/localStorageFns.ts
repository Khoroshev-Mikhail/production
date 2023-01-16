import { REFRESH_TOKEN, TOKEN } from "../variables/localStorageVariables";
import { User } from "../types/types";

export function setUserToLocalStorage(user: User){
    !user.token && console.log('TOKEN не получен')
    user.token && localStorage.setItem(TOKEN, user.token);
    user.refresh_token && localStorage.setItem(REFRESH_TOKEN, user.refresh_token);
}
export function removeUserFromLocalStorage(){
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
}