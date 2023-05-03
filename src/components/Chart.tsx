import {
	Area,
	AreaChart,
	Bar,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	BarChart,
	YAxis,
} from "recharts";

type ChartType = {
	width?: number | undefined;
	height?: number;
	data: { name: string; uv: number; pv: number; amt: number }[];
};

export const Chart = (props: ChartType) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
				// style={{ width: "100%" }}
				width={props.width}
				height={props.height}
				// height={326.92}
				data={props.data}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
					</linearGradient>
					<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
					</linearGradient>
				</defs>
				{/* <XAxis dataKey="name" />
								<YAxis /> */}
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<Area
					type="monotone"
					dataKey="uv"
					stroke="#8884d8"
					fillOpacity={1}
					fill="url(#colorUv)"
				/>
				<Area
					type="monotone"
					dataKey="pv"
					stroke="#82ca9d"
					fillOpacity={1}
					fill="url(#colorPv)"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};

export const BarChartComp = ({ data }: ChartType) => (
	<ResponsiveContainer width="100%" height="100%">
		<BarChart data={data} barSize={80}>
			<XAxis
				dataKey="name"
				scale="point"
				padding={{ left: 60, right: 50 }}
				width={5000}
			/>
			<YAxis />
			<Tooltip />
			{/* <Legend /> */}
			<CartesianGrid strokeDasharray="3 3" />
			<Bar dataKey="pv" fill="#002E66" background={{ fill: "#fff" }} />
		</BarChart>
	</ResponsiveContainer>
);
