import {combineReducers} from "redux";
import {UserReducer} from "./reducer/user";
import ErrorReducer from "./reducer/ErrorReducer";
import { SideBarReducer } from "./reducer/SideBar";
import { CustomizeReducer } from "./reducer/CustomizeReducer";

export const rootReducer = combineReducers({
    user: UserReducer,
    sideBar:SideBarReducer,
    error: ErrorReducer,
    customize: CustomizeReducer
});