// Import worker as a URL for pdfjs-dist
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Type for pdfjsLib instance
type PDFJS = typeof import('pdfjs-dist/build/pdf.mjs');

// Singleton for loaded pdfjsLib
let pdfjsLib: PDFJS | null = null;
let loadPromise: Promise<PDFJS> | null = null;

export interface PdfConversionResult {
	imageUrl: string;
	file: File | null;
	error?: string;
}

/**
 * Dynamically load pdfjsLib and set the worker source.
 * Ensures only one instance is loaded (singleton).
 */
async function loadPdfJs(): Promise<PDFJS> {
	if (pdfjsLib) return pdfjsLib;
	if (loadPromise) return loadPromise;
	// Dynamically import pdfjsLib
	loadPromise = import('pdfjs-dist/build/pdf.mjs').then(lib => {
		// Set the worker source to the URL from node_modules (via Vite ?url)
		lib.GlobalWorkerOptions.workerSrc = workerSrc;
		pdfjsLib = lib;
		return lib;
	});
	return loadPromise;
}

export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
	try {
		const lib = await loadPdfJs();
		const arrayBuffer = await file.arrayBuffer();
		const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
		const page = await pdf.getPage(1);

		// Use a high scale for better image quality
		const viewport = page.getViewport({ scale: 4 });
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		if (!context) {
			return {
				imageUrl: '',
				file: null,
				error: 'Failed to get 2D context from canvas'
			};
		}

		canvas.width = viewport.width;
		canvas.height = viewport.height;
		context.imageSmoothingEnabled = true;
		context.imageSmoothingQuality = 'high';

		await page.render({ canvasContext: context, viewport }).promise;

		// Convert canvas to PNG Blob and File
		return await new Promise<PdfConversionResult>(resolve => {
			canvas.toBlob(
				blob => {
					if (!blob) {
						resolve({
							imageUrl: '',
							file: null,
							error: 'Failed to create image blob'
						});
						return;
					}
					const originalName = file.name.replace(/\.pdf$/i, '');
					const imageFile = new File([blob], `${originalName}.png`, {
						type: 'image/png'
					});
					resolve({
						imageUrl: URL.createObjectURL(blob),
						file: imageFile
					});
				},
				'image/png',
				1.0
			);
		});
	} catch (err) {
		// Log error for debugging
		console.error('convertPdfToImage error:', err);
		return {
			imageUrl: '',
			file: null,
			error: err instanceof Error ? err.message : String(err)
		};
	}
}
