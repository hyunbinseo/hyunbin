<script lang="ts">
	let title = $state('자모야 모여라');
	let description = $state('한글 자모가 분리되어 표시되는 파일 이름을 수정하는 온라인 도구입니다.');
	let imageUrl = $state('https://jamoya.one/open-graph.png');
</script>

<form class="flex w-[400px] flex-col gap-y-6 *:flex *:flex-col *:gap-y-1">
	<label>
		<span>이미지 파일</span>
		<input
			type="file"
			accept="image/*"
			onchange={(e) => {
				const file = e.currentTarget.files?.[0];
				if (!file) return;

				const reader = new FileReader();

				reader.onload = (e) => {
					if (!e.target) return;
					imageUrl = e.target.result as string;
				};

				reader.readAsDataURL(file);
			}}
		/>
	</label>
	<label>
		<span>제목</span>
		<input type="text" bind:value={title} />
	</label>
	<label>
		<span>설명</span>
		<textarea bind:value={description} rows="4"></textarea>
	</label>
</form>

<figure class="mt-6">
	<figcaption class="font-bold">카카오</figcaption>
	<div class="preview-box mt-1">
		<div class="preview-image-box" style:background-image="url('{imageUrl}')"></div>
		<div class="preview-text-box">
			<p>{title}</p>
			<p class="description">{description}</p>
			<p class="url">example.com</p>
		</div>
	</div>
</figure>

<style>
	form > label > span:first-child:has(+ :is(input, textarea)) {
		font-weight: bold;
	}
	.preview-box {
		font-size: 14px;
		line-height: 24px;
		color: #111;
		letter-spacing: -0.2px;
		text-align: left;
		word-break: break-all;
		/* specific */
		width: 400px;
		height: 294px;
		border: 1px solid #e5e5e5;
		border-radius: 8px;
	}
	.preview-image-box {
		width: 100%;
		height: 210px;
		border-bottom: 1px solid #e5e5e5;
		background-size: cover;
		background-position: 50%;
		background-repeat: no-repeat;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}
	.preview-text-box {
		padding: 8px 12px;
	}
	.description {
		font-size: 14px;
		line-height: 24px;
		color: #707070;
		letter-spacing: -0.2px;
		/* specific */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-top: -4px;
		font-size: 13px;
	}
	.url {
		font-size: 14px;
		line-height: 24px;
		color: #aaa;
		letter-spacing: -0.2px;
		clear: both;
		/* specific */
		font-size: 12px;
	}
</style>
