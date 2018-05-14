/**
 * Created by Xiaotao.Nie on 2018/5/12.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */

import * as type from './type'

export const userLogin = (data) => {
    return {
        type: type.USER_LOGIN,
        data
    }
}

export const userLogOut = (data) => {
    return {
        type: type.USER_LOGOUT,
        data
    }
}