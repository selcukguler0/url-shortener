import React, { useEffect, useRef, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	indexAxis: "y" as const,
	aspectRatio: 1 / 2,
	elements: {
		bar: {
			borderWidth: 2,
		},
	},
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: true,
			text: "Views by Country",
			font: {
				size: 16,
				weight: "bold",
			},
		},
	},
	scales: {
		y: {
			ticks: {
				color: "rgb(132, 6, 57)",
				font: {
					size: 14,
					weight: "bold",
				},
			},
			grid: { display: false },
			border: { color: "black" },
		},
		x: {
			// ticks: { display: false },
			grid: { display: false },
			border: { color: "black" },
		},
	},
};

function createGradient(
	ctx: CanvasRenderingContext2D,
	area: any,
	color: string
) {
	const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

	if (color == "pink") {
		gradient.addColorStop(1, "rgb(255, 7, 200, 1)");
		gradient.addColorStop(0.7, "rgb(204, 7, 100, 0.65)");
		// gradient.addColorStop(0.2, "rgb(101, 1, 41, 0.65)");
		gradient.addColorStop(0, "rgb(150, 7, 100, 0.25)");
	} else {
		gradient.addColorStop(1, "rgb(155, 57, 255, 0.65)");
		gradient.addColorStop(0.5, "rgb(123, 57, 204, 0.65)");
		// gradient.addColorStop(0.2, "rgb(92, 33, 153, 0.65)");
		gradient.addColorStop(0, "rgb(60, 57, 80, 1)");
	}
	console.log("gradient :>> ", gradient);
	return gradient;
}

export function CountryChart() {
	const chartRef = useRef(null);
	const [chartData, setChartData] = useState<ChartData>({
		labels: [],
		datasets: [
			{
				label: "",
				data: [],
				borderColor: "",
				backgroundColor: "",
			},
		],
	});

	const labels = ["USA", "UK", "Canada", "Australia", "Germany", "France"];

	useEffect(() => {
		const chart = chartRef.current as any;
		const data = {
			labels,
			datasets: [
				{
					label: "Views",
					data: Array.from({ length: 6 }, () =>
						Math.floor(Math.random() * 150)
					),
					borderColor: "rgba(0, 0, 0, 0.1)",
					backgroundColor: createGradient(chart.ctx, chart.chartArea, "pink"),
				},
			],
		};
		setChartData(data);
	}, []);

	return (
		<div className="content_item">
			<Bar
				ref={chartRef}
				height={undefined}
				width={undefined}
				options={options}
				data={chartData}
			/>
		</div>
	);
}

type ChartData = {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		borderColor: CanvasGradient | string;
		backgroundColor: CanvasGradient | string;
	}[];
};