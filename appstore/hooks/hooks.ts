import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const user = useAppSelector((state) => state.session);
  return user;
};

export const useRole = () => {
  const user = useAppSelector((state) => state.session);
  return {
    role: user.user?.role ?? null,
    isLoading: user.status === "loading",
  };
};
