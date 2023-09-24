import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./Auth/reducer";
import thunk from "redux-thunk";
import productReducer from "./Product/reducer";
import cartReducer from "./Cart/reducer";


let rootReducers = combineReducers({
    auth : authReducer,
    product : productReducer,
    cart: cartReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

export default store;