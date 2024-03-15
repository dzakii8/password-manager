import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dataPassword: [],
}

export const fetchSlice = createSlice({
  name: 'dataPassword',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    setDataPassword: (state,action)=>{
        state.dataPassword = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDataPassword } = fetchSlice.actions

export default fetchSlice.reducer