import { type } from "os";
import { ReactElement, ReactNode } from "react";
import revenue from "src/assets/revenue.svg";
import totalTransactions from "src/assets/totalTransactions.svg";
import attendant from "src/assets/attendant.svg";
import branches from "src/assets/branches.svg";
import branchBtn from "src/assets/branchbtn.svg";
import walletBtn from "src/assets/walletbtn.svg";
import { cardType } from "./alias";
import { CurrencyFormatter } from "./helperFunction";

export const cardData: cardType[] = [
	{
		id: 1,
		icon: revenue,
		amount: CurrencyFormatter(Number("12000")),
		name: "Total Revenue",
	},
	{
		id: 2,
		icon: totalTransactions,
		amount: CurrencyFormatter(Number("12000")),
		name: "Total Transactions",
	},
	{
		id: 3,
		icon: attendant,
		amount: CurrencyFormatter(Number("12000")),
		name: "Attendants",
	},
	{
		id: 4,
		icon: branches,
		amount: "1230",
		name: "Attendants",
	},
];
export const cardBtnData: cardType[] = [
	{
		id: 1,
		icon: branchBtn,

		name: "Branches",
	},
	{
		id: 2,
		icon: walletBtn,

		name: "View Wallet",
	},
];

export const data = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

export const datas = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Page H",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Page I",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Page J",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Page K",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Page L",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Page M",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Page N",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
	{
		name: "Page O",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];
