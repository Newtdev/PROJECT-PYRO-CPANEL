import * as Yup from "yup";

export const AddbranchValidation = [
	Yup.object({
		name: Yup.string().label("Branch name").required(),
		phoneNumber: Yup.string()
			.label("phone number")
			.length(11, "invalid")
			.required(),
		location: Yup.object({
			lga: Yup.string().label("LGA").required(),
			state: Yup.string().label("State").required(),
		}),
	}),
	Yup.object({
		branchManager: Yup.object({
			firstName: Yup.string().label("First name").required(),
			lastName: Yup.string().label("Last name").required(),
			phoneNumber: Yup.string()
				.label("phone number")
				.length(11, "invalid")
				.required(),
			email: Yup.string().label("Email").email().required(),
			password: Yup.string().label("Password").required(),
		}),
	}),
];

export const UpdateHQAdminInfoValidation = [
	Yup.object({
		firstName: Yup.string().label("First name").required(),
		lastName: Yup.string().label("Last name").required(),
		email: Yup.string().label("Last name").email().required(),
		phoneNumber: Yup.string()
			.label("phone number")
			// .length(11, "invalid")
			.required(),
	}),
];
export const UpdateHQPasswordInfoValidation = [
	Yup.object({
		oldPassword: Yup.string().label("oldPassword").required(),
		password: Yup.string().label("New Password").required(),
		confirmPassword: Yup.string()
			.label("New Password")
			.oneOf([Yup.ref("password")], "Passwords must match")
			.required(),
	}),
];
