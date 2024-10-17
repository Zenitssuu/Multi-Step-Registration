import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name:"",
    email:"",
    password:"",
    address:"",
    phoneNumber:"",
}

const formSlice = createSlice({
    name:"formSlice",
    initialState,
    reducers:{
        setName:(state,action) => {
            state.name=action.payload.trim();
        },
        setEmail:(state,action)=> {
            state.email=action.payload.trim();

        },
        setPassword:(state,action) => {
            state.password=action.payload.trim();

        },
        setAddress:(state,action) => {
            state.address=action.payload.trim();

        },
        setPhoneNumber:(state,action) => {
            state.phoneNumber=action.payload.trim();
        },
        
        clearDetails:(state,action) =>{
            state.name=""
            state.email=""
            state.password=""
            state.address=""
            state.phoneNumber=""
        }
    }
})

export const {setAddress,setName,setEmail,setPassword,setPhoneNumber,clearDetails} = formSlice.actions;

export default formSlice.reducer