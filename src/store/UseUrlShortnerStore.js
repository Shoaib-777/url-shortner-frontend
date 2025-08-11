import { create } from 'zustand'
import {axiosInstance} from "../axios/axiosInstance"


export const useUrlShortnerStore = create((set, get) => ({
    UserData: [],
    IsLoadingGroup:true,
    IsLoadingInput:false,
    IsCreatingLink:true,
    CurrentLink:null,


    getUserData:async(id)=>{
        if(!id){
            console.log("user id is required")
            return
        }
        try {
            set({IsLoadingGroup:true})
            const res = await axiosInstance.get(`/user/${id}`)
            set({UserData:res.data.data})
            // console.log("Data Fetch Sucess",res.data)
        } catch (error) {
            console.log("error Creating Short Link",error)
        }finally{
            set({IsLoadingGroup:false})
        }
    },
    createNewShortUrl:async(OrgUrl,ShortCode)=>{
        if(!OrgUrl || !ShortCode){
            console.log("original url and shortcode is required")
            return
        }
        try {
            set({IsLoadingInput:true})
            const res = await axiosInstance.post('/shorten',{OrgUrl,ShortCode})
            set({CurrentLink:res.data.data.short_code,UserData: [res.data.data, ...get().UserData]})
            // console.log(res.data)
        } catch (error) {
            console.log("error posting shortcode at api",error)
        }finally{
            set({IsLoadingInput:false})
        }
    }
}))
