import { Fragment } from "react";
import {
	CurrencyFormatter,
	splitByUpperCase,
} from "src/helpers/helperFunction";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function ProductCard(props: any) {
	return (
		<div className="w-full h-fit bg-white shadow-lg rounded-lg text-[14px] py-6">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-10 py-4 md:gap-x-2 text-start px-4 lg:px-16">
				{Object.keys(props?.data)?.map((dt, i) => (
					<Fragment key={i + 1}>
						<div>
							<h2 className="text-black capitalize">{splitByUpperCase(dt)}</h2>
							<span className="block bg-[#737587] h-0.5 w-20 my-1.5 rounded-lg capitalize"></span>
							<h2 className="text-[#002E66] capitalize">
								{CurrencyFormatter(props?.data[dt]?.price ?? null)}
							</h2>

							<h2 className="text-[#002E66] capitalize">
								Available:
								{!props?.data[dt]?.isAvailable ? " NO" : " YES"}
							</h2>
							{props?.show ? <CustomizedSwitches /> : null}
						</div>
					</Fragment>
				))}
			</div>
		</div>
	);
}

const IOSSwitch = styled((props: SwitchProps) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	"& .MuiSwitch-switchBase": {
		padding: 0,
		margin: 2,
		transitionDuration: "300ms",
		"&.Mui-checked": {
			transform: "translateX(16px)",
			color: "#fff",
			"& + .MuiSwitch-track": {
				backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
				opacity: 1,
				border: 0,
			},
			"&.Mui-disabled + .MuiSwitch-track": {
				opacity: 0.5,
			},
		},
		"&.Mui-focusVisible .MuiSwitch-thumb": {
			color: "#33cf4d",
			border: "6px solid #fff",
		},
		"&.Mui-disabled .MuiSwitch-thumb": {
			color:
				theme.palette.mode === "light"
					? theme.palette.grey[100]
					: theme.palette.grey[600],
		},
		"&.Mui-disabled + .MuiSwitch-track": {
			opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
		},
	},
	"& .MuiSwitch-thumb": {
		boxSizing: "border-box",
		width: 22,
		height: 22,
	},
	"& .MuiSwitch-track": {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
		opacity: 1,
		transition: theme.transitions.create(["background-color"], {
			duration: 500,
		}),
	},
}));

function CustomizedSwitches() {
	return (
		<FormGroup>
			<Stack direction="row" spacing={1} alignItems="center">
				<Typography>Off</Typography>
				{/* <AntSwitch defaultChecked inputProps={{ "aria-label": "ant design" }} /> */}
				<FormControlLabel
					control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
					label=""
				/>
				<Typography>On</Typography>
			</Stack>
		</FormGroup>
	);
}
