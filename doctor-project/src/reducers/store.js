// store.js
import { configureStore } from "@reduxjs/toolkit";
import { Doctorreducer } from "./Reducers.js";


const store = configureStore({
     reducer:Doctorreducer
});

export default store;
