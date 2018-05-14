/**
 * Created by Xiaotao.Nie on 2018/5/12.
 * All right reserved
 * IF you have any question please email onlythen@yeah.net
 */

import {
    combineReducers
} from "redux"
import * as type from "../action/type"

const nodeData = (state = { name : "小竞猜" }, action) => {
    switch (action.type) {
        default:
            return {
                ...state
            }
    }
}

const userInfo = (state = {login: false }, action) => {
    switch (action.type){

        case type.USER_LOGIN:

            return {
                login: true,
                info: action.data
            }

        case type.USER_LOGOUT:

            return {
                login:false
            }

        default:
            return {
                ...state
            }
    }
}

export default combineReducers({
    nodeData,
    userInfo,
})