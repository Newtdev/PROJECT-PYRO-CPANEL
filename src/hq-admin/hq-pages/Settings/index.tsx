import React from "react";
import { useAuth } from "src/hooks/useAuth";
import { useFetchHQBranchQuery } from "src/hq-admin/hq-api/manageHqApiSlice";
import Settings from "src/screens/dashboard/pages/Settings";

export default function HqSetting() {
	const { user } = useAuth();
	const hqId = user?.stationHQ;
	const fetchAllBranchResult = useFetchHQBranchQuery(
		{
			hqId: hqId,
		},
		{ skip: !hqId }
	);

	return <div />;
}
