import { createStore } from "redux";
import todos from "../reducers/todos";

export const store = createStore(todos);
