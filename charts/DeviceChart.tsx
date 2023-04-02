import React, { useRef, useEffect, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { ChartOptions, ChartType } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

const options: ChartOptions<'line'> = {
	responsive: true,
	interaction: {
		mode: "nearest",
		axis: "x",
		intersect: false,
	},
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Views by Device",
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
			ticks: { display: false },
			grid: { display: false },
			border: { color: "black" },
		},
	},
};

const labels = ["January", "February", "March", "April", "May", "June"];

function createGradient(
	ctx: CanvasRenderingContext2D,
	area: any,
	color: string
) {
	const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

	if (color == "pink") {
		gradient.addColorStop(1, "rgb(255, 7, 200, 0.65)");
		gradient.addColorStop(0.7, "rgb(204, 7, 100, 0.65)");
		// gradient.addColorStop(0.2, "rgb(101, 1, 41, 0.65)");
		gradient.addColorStop(0, "rgb(150, 7, 100, 1)");
	} else {
		gradient.addColorStop(1, "rgb(155, 57, 255, 0.65)");
		gradient.addColorStop(0.5, "rgb(123, 57, 204, 0.65)");
		// gradient.addColorStop(0.2, "rgb(92, 33, 153, 0.65)");
		gradient.addColorStop(0, "rgb(60, 57, 80, 1)");
	}
	console.log("gradient :>> ", gradient);
	return gradient;
}
export default function DeviceChart({ className }: { className: string }) {
	const chartRef = useRef(null);
	const [chartData, setChartData] = useState<ChartData>({
		labels: [],
		datasets: [],
	});
	useEffect(() => {
		const chart: any = chartRef.current;

		if (!chart) {
			return;
		}

		let data: ChartData = {
			labels,
			datasets: [
				{
					fill: false,
					label: "Desktop",
					data: Array.from({ length: 6 }, () =>
						Math.floor(Math.random() * 150)
					),
					tension: 0.3,
					borderColor: createGradient(chart.ctx, chart.chartArea, "pink"),
					backgroundColor: createGradient(chart.ctx, chart.chartArea, "pink"),
				},
				{
					fill: false,
					label: "Mobile",
					data: Array.from({ length: 6 }, () =>
						Math.floor(Math.random() * 150)
					),
					tension: 0.3,
					borderColor: createGradient(chart.ctx, chart.chartArea, "purple"),
					backgroundColor: createGradient(chart.ctx, chart.chartArea, "purple"),
				},
			],
		};
		setChartData(data);
	}, []);
	return (
		<div className={className}>
			<Line ref={chartRef} options={options} data={chartData} />
		</div>
	);
}

type ChartData = {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		fill: boolean;
		tension: number;
		borderColor: CanvasGradient;
		backgroundColor: CanvasGradient;
	}[];
};
