import InputComp from "src/components/InputComp";

export const DepotManageInformation = ({ formik }: { formik: any }) => {
	return (
		<div>
			<InputComp
				label="First name"
				error={formik.errors.firstName}
				placeholder={"Manager first name"}
				{...formik.getFieldProps("firstName")}
			/>
			<InputComp
				label="Last name"
				placeholder={"Manager last name"}
				error={formik.errors.lastName}
				{...formik.getFieldProps("lastName")}
			/>
			<InputComp
				label="Email"
				placeholder={"Manager email"}
				error={formik.errors.email}
				{...formik.getFieldProps("email")}
			/>
			<InputComp
				label="Phone number"
				placeholder="Manager Phone number"
				error={formik.errors.phoneNumber}
				{...formik.getFieldProps("phoneNumber")}
			/>
			<InputComp
				label="Create password"
				placeholder="Password"
				error={formik.errors.password}
				{...formik.getFieldProps("password")}
			/>
		</div>
	);
};
