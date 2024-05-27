// 
import moment from 'moment';

export const isEmptyOrNull = (value) => {
    return (value === null || value === "" || value === undefined) ? true : false;
}

export const getUser = () => {
    var user = localStorage.getItem('user');
    if(!isEmptyOrNull(user)){
        user = JSON.parse(user);
        return user;
    }else{
        logout()
        return {};
    }
}

export let getPermission = () => {
    var permission = localStorage.getItem('permission');
    if(!isEmptyOrNull(permission)){
        permission = JSON.parse(permission);
        return permission;
    }else{
        return null;
    }
}

export const isPermission = (code_permission) => {
    var arrPermission = getPermission();
    if(arrPermission){
        if(arrPermission.includes(code_permission)){
            return true;  // mean have permission
        }
        return false; // mean don't have permission
    }else{
        return false;
    }
}

export const Config = {
    image_path : "http://localhost:8080/project/images-server-api/"
}

export const getAccessToken = () => {
    var access_token = localStorage.getItem('access_token');
    if(!isEmptyOrNull(access_token)){
        return access_token;
    }else{
        return null;
    }
}

export const getRefreshToken = () => {
    var refresh_token = localStorage.getItem('refresh_token');
    if(!isEmptyOrNull(refresh_token)){
        return refresh_token;
    }else{
        return null;
    }
}

export const formateDateClient = (date) => {
    if(!isEmptyOrNull(date)){
        return moment(date).format("dddd Do MMMM YYYY");
    }
    return null;
}

export const formateDateServer = (date) => {
    if(!isEmptyOrNull(date)){
        return moment(date).format("YYYY-MM-DD");
    }
    return null;
}

export const logout = () => {
    localStorage.setItem('isLogin', '0');
    window.location.href = "/dashboard/login";
}

export const storeUserData = (param) => {
    localStorage.setItem("access_token",param.access_token);
    localStorage.setItem("refresh_token",param.refresh_token);
    localStorage.setItem("user",JSON.stringify(param.user));
    localStorage.setItem("permission",JSON.stringify(param.permission));
    localStorage.setItem('isLogin', '1');
}