import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';

export const generatePdfResume = async (resumeElementId = 'ats-resume-container') => {
  try {
    const input = document.getElementById(resumeElementId);
    if (!input) {
      alert('Resume element not found for PDF export.');
      return;
    }

    // Trigger celebratory confetti burst!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pdfHeight));
    pdf.save('R_KANNAN_MERN_Stack_Developer_Resume.pdf');
  } catch (error) {
    console.error('PDF Generation failed:', error);
    // Fallback printable print window
    window.print();
  }
};
