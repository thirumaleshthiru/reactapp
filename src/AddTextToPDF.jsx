import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const AddTextToPDF = () => {
  const [modifiedPDFBytes, setModifiedPDFBytes] = useState(null);

  const addTextToPDF = async (pdfBytes, textToAdd) => {
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Check if the Helvetica font is available
      let font = await pdfDoc.embedFont('Helvetica');
      if (!font) {
        // If Helvetica is not available, fall back to a default font
        console.warn('Helvetica font not found. Using default font.');
        font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
      }

      const pages = pdfDoc.getPages();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();

        page.drawText(textToAdd, {
          x: width / 2,
          y: height - 50,
          font: font,
          size: 12,
          color: rgb(0, 0, 0), // Black color
        });
      }

      const modifiedPDFBytes = await pdfDoc.save();
      setModifiedPDFBytes(modifiedPDFBytes);
    } catch (error) {
      console.error('Error adding text to PDF:', error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const pdfBytes = new Uint8Array(event.target.result);
        await addTextToPDF(pdfBytes, 'Your Text Here');
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {modifiedPDFBytes && (
        <a href={`data:application/pdf;base64,${btoa(
          String.fromCharCode(...modifiedPDFBytes)
        )}`} download="modified.pdf">
          Download Modified PDF
        </a>
      )}
    </div>
  );
};

export default AddTextToPDF;
