<script lang="ts">
	let title = $state('자모야 모여라');
	let description = $state('한글 자모가 분리되어 표시되는 파일 이름을 수정하는 온라인 도구입니다.');
	let imageUrl = $state('https://jamoya.one/open-graph.png');
</script>

<form class="flex w-[400px] flex-col gap-y-6">
	<label>
		<span>이미지 파일</span>

		<!-- 이미지의 MIME 유형입니다. image/jpeg, image/gif, image/png 중 하나입니다. -->
		<!-- Reference https://developers.facebook.com/docs/sharing/webmasters/#images -->

		<!-- WebP, AVIF formats are supported by many major platforms. -->
		<!-- Reference https://joost.blog/use-avif-webp-share-images/ -->

		<input
			type="file"
			accept={['image/jpeg', 'image/gif', 'image/png'].join(', ')}
			onchange={async (e) => {
				const file = e.currentTarget.files?.[0];
				if (!file) return;

				const buffer = await file.arrayBuffer();
				const blob = new Blob([buffer], { type: file.type });
				imageUrl = URL.createObjectURL(blob);
			}}
			class="mt-1 block"
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
	<ul class="mt-1 w-fit space-y-1 text-sm">
		<li>
			<a href="https://developers.kakao.com/tool/debugger/sharing">카카오 공유 디버거</a>는
			<code>400 x 210</code> 해상도를 사용하나,
		</li>
		<li class="bg-yellow-400">
			실제로는 <code>2:1</code> 비율에 가까워 위아래가 조금 더 잘립니다.
		</li>
	</ul>
	<div class="preview-box mt-4">
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
