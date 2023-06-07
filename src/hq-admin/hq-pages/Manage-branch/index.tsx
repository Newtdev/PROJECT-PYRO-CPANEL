import React from "react";
import { useFetchHQBranchQuery } from "src/hq-admin/hq-api/manageHqApiSlice";

export default function ManageHQBranch() {
	const result = useFetchHQBranchQuery("");
	console.log(result);
	return <div>ManageHQBranch</div>;
}
