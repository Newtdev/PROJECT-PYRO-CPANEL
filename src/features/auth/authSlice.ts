/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";
import { authAPISlice } from "src/api/authApiSlice";
import { loginResponseType } from "src/helpers/alias";
import { RootState } from "src/store/store";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: { role: null, firstName: "", lastName: "" },
		token: { accessToken: null, refreshToken: null },
	} as loginResponseType,

	reducers: {
		setCredentials: (state, action) => {
			state.user = action.payload?.user;
			state.token.accessToken = action.payload.token;
			state.user.role = action.payload?.user.role;
		},

		logOut: (state, action) => {
			state.user.role = null;
			state.user.firstName = "";
			state.user.lastName = "";
			state.token.accessToken = null;
		},
	},

	extraReducers: (builder) => {
		builder.addMatcher(
			authAPISlice.endpoints.login.matchFulfilled,
			(state, action) => {
				state.user = action.payload?.user;
				state.token.accessToken = action.payload.token.accessToken;
				state.token.refreshToken = action.payload.token.refreshToken;
				state.user.role = action.payload?.user.role;

				sessionStorage.setItem(
					"fuleap-user-info",
					JSON.stringify({
						token: action.payload.token.accessToken,
						user: action.payload?.user,
					})
				);
			}
		);
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentLoginUser = (state: RootState) =>
	state.authSlice.user;
export const selectCurrentLoginToken = (state: RootState) =>
	state.authSlice.token;
