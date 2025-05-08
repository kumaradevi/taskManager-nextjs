const { createSlice } = require("@reduxjs/toolkit");


const initialState={
    tasks:[],
    taskLoading:false,
    taskError:false,
}


const taskSlice=createSlice({
  name:"task",
  initialState,
  reducers:{
    fetchTasks:(state,action)=>{
        state.tasks=action.payload
    },
    taskLoading:(state,action)=>{
        state.taskLoading=action.payload
    },
    taskError:(state,action)=>{
        state.taskError=action.payload
    },
  }

})

export const {fetchTasks,taskLoading,taskError} =taskSlice.actions;
export const selectAllTasks=(state)=>state.task.tasks;
export const selectTaskLoading=(state)=>state.task.taskLoading;
export const selectTaskError=(state)=>state.task.taskError;
export default taskSlice.reducer;