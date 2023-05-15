export enum API_ROUTE {
	LOGIN = "auth/system-admin/login-email",
	GET_ALL_HQ = "/system-admin/station-hq",
	ADD_NEW_HQ = "system-admin/station-hq",
}

export enum APP_ROUTE {
	LANDING_PAGE = "/",
	DASHBOARD = "/",
	LOGIN = "/login",
	BRANCH = "/branch",
	TRANSACTIONS = "/transactions",
	SUPPORT = "/support",
	NOTIFICATION = "/notification",
	SELF_HELP = "/self-help",
	SETTINGS = "/settings",
	USER = "/USER",
	USER_PROFILE = "/user/:name",
	USER_WALLET = "/user/:name/wallet",
	MANAGEHQ = "/manageHQ",
	MANAGE_SINGLE_HQ = "/manageHQ/:id",
	MANAGE_SINGLE_BRANCH = "/branch/:id",
	BRANCHES = "/branches",
	VIEW_WALLET = "/view/wallet",
	ATTENDANT_PROFILE = "branch/:id/attendant",
	ATTENDANT_PROFILE_INFO = "/branch/:id/attendant/:name",
	ATTENDANT_REVIEW = "branch/:id/reviews",
	VIEW_HQ_WALLET = "view/:id/wallet",
	VIEW_HQ_BRANCH = "view/:id/branch",
	ADMIN_PROFILE = "/admin/profile",
	MANAGE_ADMIN = "/manage/admin",
	MANAGE_WEBSITE = "/manage/website",
	RESET_PASSWORD = "/reset/password",
}

export enum PERMISSION {
	HQ = "hq_admin",
	SYSTEM_ADMIN = "engineer",
}

export enum RTKTAG {
	MANAGE_HQ = "MANAGE_HQ",
}
