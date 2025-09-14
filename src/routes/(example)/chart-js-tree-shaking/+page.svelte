<script lang="ts">
	import { Chart } from './chart';
</script>

<!-- Reference https://www.chartjs.org/docs/latest/configuration/responsive.html#important-note -->
<div>
	<canvas
		{@attach (canvas) => {
			new Chart(canvas, {
				type: 'bar',
				data: {
					labels: ['Lorem', 'Ipsum'],
					datasets: [
						{
							label: 'Agree',
							data: [40, 90],
						},
						{
							label: 'Disagree',
							data: [60, 10],
						},
					],
				},
				options: {
					plugins: {
						title: {
							display: true,
							text: 'Stacked Bar Chart',
						},
						datalabels: {
							formatter: (v: number) => `${v}%`,
						},
					},
					scales: {
						x: { stacked: true },
						y: { stacked: true },
					},
				},
			});
		}}
	></canvas>
</div>
