<script lang="ts">
	const questionBank: string[] & { length: 110 } = [
		'0+0',
		'0+1',
		'0+2',
		'0+3',
		'0+4',
		'0+5',
		'0+6',
		'0+7',
		'0+8',
		'0+9',
		'1+0',
		'1+1',
		'1+2',
		'1+3',
		'1+4',
		'1+5',
		'1+6',
		'1+7',
		'1+8',
		'2+0',
		'2+1',
		'2+2',
		'2+3',
		'2+4',
		'2+5',
		'2+6',
		'2+7',
		'3+0',
		'3+1',
		'3+2',
		'3+3',
		'3+4',
		'3+5',
		'3+6',
		'4+0',
		'4+1',
		'4+2',
		'4+3',
		'4+4',
		'4+5',
		'5+0',
		'5+1',
		'5+2',
		'5+3',
		'5+4',
		'6+0',
		'6+1',
		'6+2',
		'6+3',
		'7+0',
		'7+1',
		'7+2',
		'8+0',
		'8+1',
		'9+0',
		'0-0',
		'1-0',
		'1-1',
		'2-0',
		'2-1',
		'2-2',
		'3-0',
		'3-1',
		'3-2',
		'3-3',
		'4-0',
		'4-1',
		'4-2',
		'4-3',
		'4-4',
		'5-0',
		'5-1',
		'5-2',
		'5-3',
		'5-4',
		'5-5',
		'6-0',
		'6-1',
		'6-2',
		'6-3',
		'6-4',
		'6-5',
		'6-6',
		'7-0',
		'7-1',
		'7-2',
		'7-3',
		'7-4',
		'7-5',
		'7-6',
		'7-7',
		'8-0',
		'8-1',
		'8-2',
		'8-3',
		'8-4',
		'8-5',
		'8-6',
		'8-7',
		'8-8',
		'9-0',
		'9-1',
		'9-2',
		'9-3',
		'9-4',
		'9-5',
		'9-6',
		'9-7',
		'9-8',
		'9-9',
	];

	const rowCount = 7;
	const colCount = 2;

	let generatedAt = $state(new Date());

	let questions = $derived(
		generatedAt &&
			Array.from(
				{ length: rowCount * colCount },
				() => questionBank[Math.floor(Math.random() * questionBank.length)],
			),
	);
</script>

<main class="not-print:mx-auto not-print:max-w-[21cm] not-print:space-y-10 not-print:py-10">
	<header class="flex items-center justify-center gap-4 *:rounded-md *:px-3 *:py-2 print:hidden">
		<button
			type="button"
			onclick={() => (generatedAt = new Date())}
			class="bg-blue-100 text-blue-700"
		>
			문제 재생성
		</button>
		<button type="button" onclick={() => window.print()} class="bg-blue-600 text-white">
			학습지 인쇄
		</button>
	</header>
	{#each { length: 2 }, pageIndex}
		<svg
			class="not-print:border-[1px]"
			xmlns="http://www.w3.org/2000/svg"
			xml:space="preserve"
			fill="#231f20"
			fill-rule="evenodd"
			stroke-miterlimit="10"
			clip-rule="evenodd"
			font-family="SUIT Variable"
			viewBox="0 0 595.44 841.92"
		>
			<text x="56.693" y="71.253" fill="#0c9344" font-size="16" font-weight="800">④</text>
			<text x="75.445" y="69.277" font-size="14" font-weight="700">다음 계산을 해 보세요.</text>

			{#each { length: rowCount }, rowIndex}
				{#each { length: colCount }, colIndex}
					{@const questionIndex = rowIndex * colCount + colIndex}
					{@const xOffset = colIndex * 248.031}
					{@const yOffset = rowIndex * 91.675}
					<text
						x={78.032 + xOffset}
						y={132.943 + yOffset}
						fill="#0c9344"
						font-size="11"
						font-weight="800"
						text-anchor="end">{questionIndex + 1})</text
					>
					<text y={135.491 + yOffset} font-size="18" font-weight="600">
						<tspan x={92.693 + xOffset} letter-spacing="17.5">{questions[questionIndex]}</tspan>
						<tspan x={177.149 + xOffset}>=</tspan>
					</text>
					<path
						fill="none"
						stroke="#0c9344"
						d="M{212.599 + xOffset} {115.34 +
							yOffset} h19.886a4.646 4.646 0 0 1 4.646 4.646v19.885a4.646 4.646 0 0 1-4.646 4.646h-19.886a4.645 4.645 0 0 1-4.645-4.646v-19.885a4.645 4.645 0 0 1 4.645-4.646Z"
					/>
				{/each}
			{/each}

			<g font-size="10">
				<text y="795.077" x="56.693" font-weight="600">배움 10.</text>
				<text y="795.077" x="91.903" font-weight="500">덧셈과 뺄셈</text>
				<text y="795.077" x="528.983">{pageIndex + 1}</text>
			</g>
		</svg>
	{/each}
</main>
