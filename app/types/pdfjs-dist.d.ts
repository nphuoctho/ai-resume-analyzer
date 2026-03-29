// Fixes missing types for pdfjs-dist ESM build

declare module 'pdfjs-dist/build/pdf.mjs' {
	// You can extend this as needed for more type safety
	export const GlobalWorkerOptions: {
		workerSrc: string;
	};
	export function getDocument(src: any): any;
}
