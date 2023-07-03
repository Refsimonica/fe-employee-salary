import { USER_LOGIN, USER_LOGOUT } from "./constants";
import debounce from 'debounce-promise';
import { profile } from '../../api/authAPI';

let debouncedFetchUser = debounce(profile, 1000);

export function userLogin(user, token, role){
  return {
    type: USER_LOGIN, user, token, role
  }
}

export function userLogout(){
  return { type: USER_LOGOUT }
}

export function userProfile(){
  return  async (dispatch) => {
      try{
        await debouncedFetchUser();
      } catch(err) {
          dispatch(userLogout());
          return err;
      }
  }

}
