export enum API_ROUTE {
	LOGIN = "auth/system-admin/login-email",
	GET_ALL_HQ = "/system-admin/station-hq",
	ADD_NEW_HQ = "system-admin/station-hq",
	GET_ALL_BRANCH = "/system-admin/station/branches",
	ADD_NEW_BRANCH = "station/branch",
	FETCH_ALL_TRANSACTION = "system-admin/transactions",
	FETCH_ALL_USERS = "system-admin/users",
	FETCH_ALL_USER = "system-admin/user",
	FETCH_BRANCH = "system-admin/station/branch",
	FETCH_SINGLE_HQ = "system-admin/station-hq",
	SELF_HELP = "system-admin/self-help",
	ADMIN = "system-admin",
	SAVE_WEBSITE_INFO = "system-admin/website-info",
	NOTIFICATION = "system-admin/notification",
	TICKET = "system-admin/ticket",
	FEEDS = "system-admin/feed",
	FORGOT_PASSWORD = "auth/system-admin/forgot-password",
	RESET_PASSWORD = "auth/system-admin/reset-password",
	RESEND_OTP = "auth/service-provider/resend-otp",

	HQ_ADMIN_LOGIN = "auth/station/login-email",
}

export enum APP_ROUTE {
	// LANDING_PAGE = "/",
	DASHBOARD = "/",
	ABOUT_US = "/about",
	CONTACT_US = "/contact",
	LOGIN = "/login",
	FORGOT_PASSWORD = "/forgot-password",
	BRANCH = "manage-Branch",
	TRANSACTIONS = "transactions",
	SUPPORT = "support",
	NOTIFICATION = "notification",
	SELF_HELP = "self-help",
	SETTINGS = "settings",
	USER = "/users",
	USER_PROFILE = "/users/:name",
	USER_WALLET = "/users/:name/wallet",
	MANAGEHQ = "/manage-HQ",
	MANAGE_SINGLE_HQ = "manage-HQ/:id",
	MANAGE_SINGLE_BRANCH = "manage-branch/:id",
	BRANCHES = "/branches",
	VIEW_WALLET = "/view/wallet",
	ATTENDANT_PROFILE = "branch/:id/attendant",
	ATTENDANT_PROFILE_INFO = "branch/:id/attendant/:name",
	ATTENDANT_REVIEW = "branch/:id/reviews",
	VIEW_HQ_WALLET = "view/:id/wallet",
	VIEW_HQ_BRANCH = "view/:id/branch",
	ADMIN_PROFILE = "admin/profile",
	MANAGE_ADMIN = "manage/admin",
	MANAGE_WEBSITE = "manage/website",
	RESET_PASSWORD = "/reset-password",
	ADD_NEW_SELF_HELP = "/add/new/self-help",
	FEEDS = "/feeds",
}

export enum HQ_APP_ROUTE {
	BRANCH = "/manage-branch",
	SINGLE_BRANCH = "/manage-branch/:id",
	TRANSACTIONS = "/transactions",
	SUPPORT = "/support",
	NOTIFICATION = "/notification",
	SETTINGS = "/settings",
}

export enum HQ_API_ENPOINTS {
	BRANCH = "station/branches",
	SINGLE_BRANCH = "station/branch",

	TRANSACTIONS = "station/transactions",
	// SUPPORT = "/support",
	NOTIFICATION = "station/notification",
	SETTINGS = "station/update-user",
	FORGOT_PASSWORD = "auth/station/forgot-password",
	RESET_PASSWORD = "auth/station/reset-password",
	RESEND_OTP = "auth/station/resend-otp",
}
export enum PERMISSION {
	HQ = "hq_admin",
	SYSTEM_ADMIN = "engineer",
}

export enum SUB_DOMAIN {
	HQ = "hq",
	SYSTEM_ADMIN = "localhost:3000",
}

export enum RTKTAG {
	MANAGE_HQ = "MANAGE_HQ",
	MANAGER_BRANCH = "MANAGE_BRANCH",
	ADMIN = "ADMIN",
	WEBSITE_INFO = "WEBSITE",
	NOTIFICATION = "NOTIFICATION",
	SELP_HELP = "SELF_HELP",
	FEEDS = "FEEDS",
	HQ_BRANCH = "BRANCH",
}

export enum KEYS {
	USER_INFO = "fuleap-user-info",
}
