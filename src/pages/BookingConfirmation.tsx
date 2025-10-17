import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Navbar from '@/components/layout/Navbar';
import { CheckCircle, Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import { format } from 'date-fns';

const BookingConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showPDF, setShowPDF] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string>('');
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Retrieve booking data from localStorage
    const storedData = localStorage.getItem(`booking_${id}`);
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }
  }, [id]);

  const generatePDF = () => {
    if (!bookingData) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header with company name
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text('CarsRus', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('EXPERT CARS, VANS & TRUCKS', pageWidth / 2, 28, { align: 'center' });
    
    // Horizontal line
    doc.setLineWidth(0.5);
    doc.line(15, 32, pageWidth - 15, 32);
    
    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('PAYMENT RECEIPT', pageWidth / 2, 42, { align: 'center' });
    
    // Receipt details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Receipt No: ${id}`, pageWidth - 60, 50);
    doc.text(`Payment Date: ${format(new Date(), 'dd/MM/yyyy')}`, pageWidth - 60, 56);
    
    // Company Details (From)
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('From:', 15, 65);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('CarsRus Ltd', 15, 71);
    doc.text('Royal Road St Pierre', 15, 77);
    doc.text('Contact: 55033736', 15, 83);
    doc.text('BRN: C24208086', 15, 89);
    
    // Customer Details (To)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('To:', pageWidth - 80, 65);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(bookingData.customer_name || 'N/A', pageWidth - 80, 71);
    doc.text(bookingData.customer_phone || 'N/A', pageWidth - 80, 77);
    doc.text(bookingData.customer_email || 'N/A', pageWidth - 80, 83);
    
    // Vehicle Details Section
    doc.setFillColor(240, 240, 240);
    doc.rect(15, 100, pageWidth - 30, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Vehicle Details', 17, 106);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Vehicle: ${bookingData.car_name || 'N/A'}`, 17, 115);
    
    // Booking Details Section
    doc.setFillColor(240, 240, 240);
    doc.rect(15, 125, pageWidth - 30, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Booking Details', 17, 131);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const numDays = Math.ceil(
      (new Date(bookingData.end_date).getTime() - new Date(bookingData.start_date).getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    
    doc.text(`Pickup Location: ${bookingData.pickup_location || 'N/A'}`, 17, 140);
    doc.text(`Pickup Date: ${bookingData.start_date ? format(new Date(bookingData.start_date), 'dd/MM/yyyy') : 'N/A'}`, 17, 147);
    doc.text(`Pickup Time: ${bookingData.pickup_time || 'N/A'}`, 17, 154);
    doc.text(`Return Location: ${bookingData.dropoff_location || 'N/A'}`, 17, 161);
    doc.text(`Return Date: ${bookingData.end_date ? format(new Date(bookingData.end_date), 'dd/MM/yyyy') : 'N/A'}`, 17, 168);
    doc.text(`Return Time: ${bookingData.return_time || 'N/A'}`, 17, 175);
    doc.text(`No. of Days: ${numDays} days`, 17, 182);
    
    // Payment Details
    doc.setFillColor(240, 240, 240);
    doc.rect(15, 192, pageWidth - 30, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Description', 17, 198);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Rental', 17, 207);
    doc.text(`Rs ${bookingData.total_amount || 0}`, pageWidth - 45, 207);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount (MUR):', 17, 220);
    doc.text(`Rs ${bookingData.total_amount || 0}`, pageWidth - 45, 220);
    
    // Additional Terms
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Additional Terms:', 15, 235);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('1. CarsRus Ltd is a professional agency acting as an intermediary between stakeholders', 17, 242);
    doc.text('2. Booking fee will be refunded based on refund policy', 17, 248);
    
    // Footer
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for choosing CarsRus Ltd. We look forward to serving you!', pageWidth / 2, 265, { align: 'center' });
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('This is a computer-generated receipt', pageWidth / 2, 280, { align: 'center' });
    
    // Generate blob URL
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    setPdfDataUrl(url);
    setShowPDF(true);
  };

  const downloadPDF = () => {
    if (!bookingData) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Duplicate the PDF generation logic from generatePDF
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 102, 204);
    doc.text('CarsRus', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('EXPERT CARS, VANS & TRUCKS', pageWidth / 2, 28, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(15, 32, pageWidth - 15, 32);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('PAYMENT RECEIPT', pageWidth / 2, 42, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Receipt No: ${id}`, pageWidth - 60, 50);
    doc.text(`Payment Date: ${format(new Date(), 'dd/MM/yyyy')}`, pageWidth - 60, 56);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('From:', 15, 65);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('CarsRus Ltd', 15, 71);
    doc.text('Royal Road St Pierre', 15, 77);
    doc.text('Contact: 55033736', 15, 83);
    doc.text('BRN: C24208086', 15, 89);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('To:', pageWidth - 80, 65);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(bookingData.customer_name || 'N/A', pageWidth - 80, 71);
    doc.text(bookingData.customer_phone || 'N/A', pageWidth - 80, 77);
    doc.text(bookingData.customer_email || 'N/A', pageWidth - 80, 83);
    doc.setFillColor(240, 240, 240);
    doc.rect(15, 100, pageWidth - 30, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Vehicle Details', 17, 106);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Vehicle: ${bookingData.car_name || 'N/A'}`, 17, 115);
    doc.setFillColor(240, 240, 240);
    doc.rect(15, 125, pageWidth - 30, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Booking Details', 17, 131);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const numDays = Math.ceil(
      (new Date(bookingData.end_date).getTime() - new Date(bookingData.start_date).getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    doc.text(`Pickup Location: ${bookingData.pickup_location || 'N/A'}`, 17, 140);
    doc.text(`Pickup Date: ${bookingData.start_date ? format(new Date(bookingData.start_date), 'dd/MM/yyyy') : 'N/A'}`, 17, 147);
    doc.text(`Pickup Time: ${bookingData.pickup_time || 'N/A'}`, 17, 154);
    doc.text(`Return Location: ${bookingData.dropoff_location || 'N/A'}`, 17, 161);
    doc.text(`Return Date: ${bookingData.end_date ? format(new Date(bookingData.end_date), 'dd/MM/yyyy') : 'N/A'}`, 17, 168);
    doc.text(`Return Time: ${bookingData.return_time || 'N/A'}`, 17, 175);
    doc.text(`No. of Days: ${numDays} days`, 17, 182);
    doc.setFillColor(240, 240, 240);
    doc.rect(15, 192, pageWidth - 30, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Description', 17, 198);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Rental', 17, 207);
    doc.text(`Rs ${bookingData.total_amount || 0}`, pageWidth - 45, 207);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount (MUR):', 17, 220);
    doc.text(`Rs ${bookingData.total_amount || 0}`, pageWidth - 45, 220);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Additional Terms:', 15, 235);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('1. CarsRus Ltd is a professional agency acting as an intermediary between stakeholders', 17, 242);
    doc.text('2. Booking fee will be refunded based on refund policy', 17, 248);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for choosing CarsRus Ltd. We look forward to serving you!', pageWidth / 2, 265, { align: 'center' });
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('This is a computer-generated receipt', pageWidth / 2, 280, { align: 'center' });
    
    doc.save(`booking-receipt-${id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto text-center">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Booking Confirmed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Thank you for your booking! Your reservation <strong>#{id}</strong> has been successfully confirmed.
              </p>
              <p className="text-sm text-muted-foreground">
                You will receive a confirmation email with all the details shortly. 
                Your car will be blocked in our system and ready for pickup on your selected date.
              </p>
              <div className="flex flex-col gap-3 pt-4">
                <Button onClick={generatePDF} className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View and Download Receipt
                </Button>
                <Button asChild className="w-full">
                  <Link to="/">Return to Home</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/cars">Browse More Cars</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PDF Viewer Dialog */}
      <Dialog open={showPDF} onOpenChange={setShowPDF}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Booking Receipt</span>
              <Button onClick={downloadPDF} size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            {pdfDataUrl && (
              <iframe
                src={pdfDataUrl}
                className="w-full h-full border-0"
                title="Booking Receipt PDF"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingConfirmation;