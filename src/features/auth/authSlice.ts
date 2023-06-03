/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";
import { authAPISlice } from "src/api/authApiSlice";
import { settingsAPISlice } from "src/api/setttingsApislice";
import { loginResponseType } from "src/helpers/alias";
import { RootState } from "src/store/store";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		systemAdmin: {
			role: null,
			firstName: "",
			lastName: "",
			avatar: { url: "" },
		},
		token: { accessToken: null, refreshToken: null },
	} as loginResponseType,

	reducers: {
		setCredentials: (state, action) => {
			state.systemAdmin = action.payload.user;
			state.token.accessToken = action.payload.token;
			state.token.refreshToken = action.payload.token.refreshToken;
			// state.systemAdmin.role = action.payload?.systemAdmin.role;
		},

		logOut: (state) => {
			state.systemAdmin.role = null;
			state.systemAdmin.firstName = "";
			state.systemAdmin.lastName = "";
			state.token.accessToken = null;
			sessionStorage.removeItem("fuleap-user-info");
		},
	},

	extraReducers: (builder) => {
		builder.addMatcher(
			authAPISlice.endpoints.login.matchFulfilled,
			(state, action) => {
				state.systemAdmin = action.payload?.systemAdmin;
				state.token.accessToken = action.payload.token.accessToken;
				state.token.refreshToken = action.payload.token.refreshToken;
				// state.systemAdmin.role = action.payload?.systemAdmin.role;

				sessionStorage.setItem(
					"fuleap-user-info",
					JSON.stringify({
						token: action.payload.token.accessToken,
						user: action.payload?.systemAdmin,
					})
				);
			}
		);
		builder.addMatcher(
			settingsAPISlice.endpoints.updateAdmin.matchFulfilled,
			(state, action) => {
				state.systemAdmin = action.payload?.data.systemAdmin;
				// state.token.accessToken = action.payload?.data.token.accessToken;
				// state.token.refreshToken = action.payload?.data.token.refreshToken;
				// state.systemAdmin.role = action.payload?.data.systemAdmin.role;
				// state.systemAdmin.avatar.url = action.payload?.data.avatar.url;
			}
		);
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentLoginUser = (state: RootState) =>
	state.authSlice.systemAdmin;
export const selectCurrentLoginToken = (state: RootState) =>
	state.authSlice.token;
export const selectRefreshToken = (state: RootState) =>
	state.authSlice.token.refreshToken;
