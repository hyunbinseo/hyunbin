import { join } from 'node:path';
import sharp from 'sharp';

const sharpStream = sharp({
	create: {
		width: 48,
		height: 48,
		channels: 4,
		background: { r: 255, g: 0, b: 0, alpha: 0.5 },
	},
});

{
	// sharp@0.34.4 does not support progressive AVIF but
	// - does not show TypeScript error
	// - does not throw runtime error
	// Reference https://sharp.pixelplumbing.com/api-output/#avif
	// Reference https://sharp.pixelplumbing.com/api-output/#toformat
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	() => sharpStream.clone().toFormat('avif', { progressive: true });

	// @ts-expect-error avif method is properly typed and shows error
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	() => sharpStream.clone().avif({ progressive: true });

	// NOTE Google Squoosh does not support progressive AVIF as well.
	// Reference https://github.com/GoogleChromeLabs/squoosh/issues/1377
}

const saveProgressiveImage = (format: 'jpg' | 'png' | 'gif') =>
	sharpStream
		.clone()
		.toFormat(format, { progressive: true })
		.toFile(join(import.meta.dirname, `progressive.${format}`));

await Promise.all([
	// NOTE IrfanView image information(properties) shows the file compression type.
	saveProgressiveImage('jpg'), // JPEG, progressive, quality: 80, subsampling ON (2x2)
	saveProgressiveImage('png'), // PNG - ZIP  , interlaced
	saveProgressiveImage('gif'), // GIF - LZW, Transparent color: 0, Interlaced
]);
