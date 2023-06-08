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
			latitude: Yup.string().label("Latitude").required(),
			longitude: Yup.string().label("longitude").required(),
		}),
	}),
	Yup.object({
		location: Yup.object({
			address: Yup.string().label("Address").required(),
			state: Yup.string().label("State").required(),
		}),
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
