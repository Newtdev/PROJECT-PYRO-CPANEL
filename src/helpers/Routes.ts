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
	ATTENDANT_PROFILE_INFO = "/branch/:id/attendant/:name",
	ATTENDANT_REVIEW = "branch/:id/reviews",
	VIEW_HQ_WALLET = "view/:id/wallet",
	VIEW_HQ_BRANCH = "view/:id/wallet",
}

export enum PERMISSION {
	HQ = "hq_admin",
}
