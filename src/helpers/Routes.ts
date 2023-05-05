export enum API_ROUTE {
	LOGIN = "auth/service-provider/login-email",
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
	MANAGEHQ = "/manageHQ",
	MANAGE_SINGLE_HQ = "/manageHQ/:id",
	MANAGE_SINGLE_BRANCH = "/branch/:id",
	BRANCHES = "/branches",
	VIEW_WALLET = "/view/wallet",
	ATTENDANT_PROFILE = "branch/:id/attendant",
	ATTENDANT_REVIEW = "branch/:id/reviews",
}

export enum PERMISSION {
	HQ = "hq_admin",
}
