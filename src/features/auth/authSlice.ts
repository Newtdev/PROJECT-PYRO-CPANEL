/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit";
import { authAPISlice } from "src/api/authApiSlice";
import { manageBranAPISlice } from "src/api/manageBranchAPISlice";
import { manageHqAPISlice } from "src/api/manageHQApiSlice";
import { settingsAPISlice } from "src/api/setttingsApislice";
import { loginResponseType } from "src/helpers/alias";
import { KEYS } from "src/helpers/Constant";
import { encryptData } from "src/helpers/encryptData";
import { hqAuthAPISlice } from "src/hq-admin/hq-api/hqAuthSlice";
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
		token: { accessToken: null },
		products: [],
	} as loginResponseType,

	reducers: {
		setCredentials: (state, action) => {
			state.systemAdmin = action.payload.user;
			state.token.accessToken = action.payload?.token;
			state.token.refreshToken = action.payload?.token?.refreshToken;
			// state.systemAdmin.role = action.payload?.systemAdmin.role;
		},

		logOut: (state) => {
			state.systemAdmin.role = null;
			state.systemAdmin.firstName = "";
			state.systemAdmin.lastName = "";
			state.token.accessToken = null;
			localStorage.removeItem(KEYS.USER_INFO);
		},
	},

	extraReducers: (builder) => {
		builder.addMatcher(
			authAPISlice.endpoints.login.matchFulfilled,
			(state, action) => {
				state.systemAdmin = action.payload?.systemAdmin;
				state.token.accessToken = action.payload?.token?.accessToken;

				// state.systemAdmin.role = action.payload?.systemAdmin.role;
				encryptData(
					{
						token: action.payload.token.accessToken || "",
						user: action.payload?.systemAdmin || null,
					},
					KEYS.USER_INFO
				);
			}
		);
		builder.addMatcher(
			hqAuthAPISlice.endpoints.hqLogin.matchFulfilled,
			(state, action) => {
				state.systemAdmin = action.payload?.user;
				state.token.accessToken = action.payload?.token?.accessToken;

				// state.systemAdmin.role = action.payload?.systemAdmin.role;
				encryptData(
					{
						token: action.payload.token.accessToken || "",
						user: action.payload?.user || null,
					},
					KEYS.USER_INFO
				);
			}
		);

		builder.addMatcher(
			settingsAPISlice.endpoints.updateAdmin.matchFulfilled,
			(state, action) => {
				state.systemAdmin = action.payload?.data.systemAdmin;
			}
		);
		builder.addMatcher(
			manageBranAPISlice.endpoints.singleDepot.matchFulfilled,
			(state, action) => {
				state.products = action.payload?.depot[0]?.products;
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
export const depotProducts = (state: RootState) => state.authSlice.products;

console.log(depotProducts);
