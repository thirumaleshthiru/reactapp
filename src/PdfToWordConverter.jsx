import { useEffect, useRef } from 'react';

export default function PdfToWordConverter(props) {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		let instance, PSPDFKit;
		(async function () {
			PSPDFKit = await import('pspdfkit');
			PSPDFKit.unload(container);

			instance = await PSPDFKit.load({
				// Container where PSPDFKit should be mounted.
				container,
				// The document to open.
				document: props.document,
				// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
				baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
			});
			instance.exportPDF().then((buffer) => {
				const blob = new Blob([buffer], {
					type: 'application/pdf',
				});
				const objectUrl = window.URL.createObjectURL(blob);
				downloadPdf(objectUrl);
				window.URL.revokeObjectURL(objectUrl);
			});
		})();

		return () => PSPDFKit && PSPDFKit.unload(container);
	}, []);

	return (
		<div
			ref={containerRef}
			style={{ width: '100%', height: '100vh' }}
		/>
	);
}

function downloadPdf(blob) {
	const a = document.createElement('a');
	a.href = blob;
	a.style.display = 'none';
	a.download = 'output.pdf';
	a.setAttribute('download', 'output.pdf');
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}