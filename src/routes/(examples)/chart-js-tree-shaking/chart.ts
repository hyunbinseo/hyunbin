import { browser } from '$app/environment';
import {
	BarController,
	BarElement,
	CategoryScale,
	Chart as ChartJs,
	Colors,
	Legend,
	LinearScale,
	Title,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Reference https://www.chartjs.org/docs/latest/getting-started/integration.html#bundle-optimization
// Reference https://www.chartjs.org/docs/latest/getting-started/usage.html#tree-shaking

export const Chart = (
	!browser
		? undefined
		: (() => {
				ChartJs.register(
					Colors,
					// Bar chart
					BarController,
					BarElement,
					// Default scales
					CategoryScale,
					LinearScale,
					// Plugins
					Legend,
					Title,
					ChartDataLabels,
				);
				return ChartJs;
			})()
)!;
