import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem('usersState')
  ? JSON.parse(localStorage.getItem('usersState'))
  : { users: null }; // Initialize users as null

// Async thunk action to fetch users from API
export const fetchUsersFromAPI = () => async (dispatch) => {
  try {
    console.log('Fetching users')
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    dispatch(setUsersFromAPI(data));
  } catch (error) {
    console.error('Error fetching users from API:', error);
  }
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userDelete: (state, action) => {
      if (state.users && Array.isArray(state.users[0])) {
        state.users[0] = state.users[0].filter(
          (user, index) => index !== action.payload
        );
        localStorage.setItem('usersState', JSON.stringify(state)); // Update local storage
      }
    },
    AddData: (state, action) => {
      if (!state.users) {
        state.users = [[]]; // Initialize users as an array with an empty array inside
      }
      const { name, email } = action.payload;
      const id = state.users[0].length + 1;
      state.users[0].push({ id, name, email });
      localStorage.setItem('usersState', JSON.stringify(state)); // Update local storage
    },
    setUsersFromAPI: (state, action) => {
        console.log('setUsersFromAPI')
      state.users = [action.payload]; // Set users from API response
      localStorage.setItem('usersState', JSON.stringify(state)); // Update local storage
    }
  },
});

export const { userDelete, AddData, setUsersFromAPI } = userSlice.actions;

export default userSlice.reducer;
