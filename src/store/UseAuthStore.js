import { create } from "zustand";
import { axiosInstance } from "../axios/axiosInstance";

export const UseAuthStore = create((set, get) => ({
    IsLogin: false,
    userId: null,
    IsLoading: false,


    signup: async (username, email, password) => {
        if (!username || !email || !password) {
            console.log("username , email and password is required")
            return
        }
        try {
            set({IsLoading:true})
            const res = await axiosInstance.post("/user/signup", { username, email, password })
            // console.log(res.data)
        } catch (error) {
            console.log("error user signup", error)
        }finally{
            set({IsLoading:false})
        }
    },

    login: async (email, password) => {
        if (!email || !password) {
            console.log("email and password is required");
            return false;
        }
        try {
            set({IsLoading:true})
            const res = await axiosInstance.post("/user/login", { email, password });
            set({ IsLogin: true, userId: res.data.user.Id });
            // console.log(res.data);
            return true; // ✅ return success
        } catch (error) {
            console.log("error login at api", error);
            alert("Invalid Email or password")
            return false;
        }finally{
            set({IsLoading:false})
        }
    },

    verifyAuth: async () => {
        set({ IsLoading: true });
        try {
            const res = await axiosInstance.get("/user/verify");
            // console.log(res.data)
            if (res.data.isAuth) {
                set({ IsLogin: true, userId: res.data.userId });
            } else {
                set({ IsLogin: false, userId: null });
            }
        } catch {
            set({ IsLogin: false, userId: null });
        } finally {
            set({ IsLoading: false });
        }
    },
    logout: async () => {
        try {
            const res = await axiosInstance.delete("/user/logout")
            set({IsLogin:false})
            // console.log(res.data)
        } catch (error) {
            console.log("error user logout", error)
        }
    }
}))