import { Box, Tab, Tabs } from "@mui/material";

type TabsTypes = {
	handleChange: (event: React.SyntheticEvent, newValue: string) => void;
	value: string | number;
	tabData: { id: number; value: string; label: string }[];
};

export const CustomTabs = (props: TabsTypes) => {
	return (
		<Box sx={{ width: "100%" }}>
			<Tabs
				value={props?.value}
				onChange={props.handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				className="px-4"
				aria-label="secondary tabs example">
				{props.tabData?.map(
					(dt: { id: number; value: string; label: string }) => {
						return (
							<Tab
								sx={{
									fontSize: 14,
								}}
								key={dt.id}
								value={dt.value}
								label={dt.label}
							/>
						);
					}
				)}
			</Tabs>
		</Box>
	);
};
