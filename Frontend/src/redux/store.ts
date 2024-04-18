import { configureStore } from "@reduxjs/toolkit";
import allAgenciasReducer from "./agenciasSlice";
import dataReserveReducer from "./reserveSlice";
import carroReducer from "./carsSlice";
import coberturasReducer from "./coberturasSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    allAgencias: allAgenciasReducer,
    dataReserve: dataReserveReducer,
    carro: carroReducer,
    coberturas: coberturasReducer,
  },
});
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSeletor: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
