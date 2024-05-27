// 
import axios from "axios";
import {getAccessToken, getRefreshToken, logout, storeUserData} from "./helper"
import { message } from "antd";

export const config = {
    base_server : "http://localhost:8082/api/",
    image_path : "",
    version : 1
}

export default function request(url="",method="get",data={},new_token= null) {
    let access_token = getAccessToken();
    if(new_token != null){
        access_token = new_token;
    }

    return axios ({
            url : config.base_server + url,
            method : method,
            data : data,
            headers : {
                'Authorization' : "Bearer "+access_token,
            }
        }).then(res => {
            return res.data;
        }).catch(err => {
            var status = err.response?.status;
            if(status == 404){
                message.error("Route Not Round!")
            }else if(status == 401){
                return refreshToken (url,method,data);
            }else if(status == 500){
                message.error("Server Error!")
            }else{
                message.error(err.message)
            }
            return false;
        }).finally(final => {
            console.log("finally",final)
        })
}

export const refreshToken = (url,method,data) => {
    const refresh_token = getRefreshToken();
    return axios ({
        url : config.base_server + "employee_token_refresh",
        method : "post",
        data : {
            refresh_key : refresh_token
        }
    }).then(res => {
        storeUserData(res.data);
        var new_token = res.data.access_token;
        return request(url,method,data,new_token);
    }).catch(err => {  
        // តទៀតលែងបាន​ ចង់​មិនចង់​ ត្រូវ​បតែ Logout ចោល
        message.error("refresh token fail!") 
        logout();
        return false;
    })
}
