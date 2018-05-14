import thunk from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import reducer from "./redux/reducer"

// redux 注入操作
const middleware = [thunk]
const store = createStore(reducer, applyMiddleware(...middleware))
console.log(store.getState())

export default store