import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Navbar from '@/components/layout/Navbar';
import { CheckCircle, Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

const BookingConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showPDF, setShowPDF] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string>('');

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('BOOKING RECEIPT', 105, 20, { align: 'center' });
    
    // Line
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    
    // Booking Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Booking Confirmation', 20, 40);
    
    doc.setFontSize(10);
    doc.text(`Booking ID: #${id}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 58);
    doc.text(`Status: CONFIRMED`, 20, 66);
    
    // Company Info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('CarsRus Rental', 20, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Premium Car Rental Services', 20, 92);
    doc.text('Thank you for choosing CarsRus Rental!', 20, 100);
    
    // Important Information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Important Information:', 20, 120);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('- Your car has been reserved and blocked in our system', 20, 130);
    doc.text('- You will receive a confirmation email shortly', 20, 138);
    doc.text('- Please bring this receipt and valid ID at pickup', 20, 146);
    doc.text('- Contact us for any questions or changes', 20, 154);
    
    // Footer
    doc.setFontSize(8);
    doc.text('This is a computer-generated receipt', 105, 280, { align: 'center' });
    
    // Generate blob URL
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    setPdfDataUrl(url);
    setShowPDF(true);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Generate same PDF
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('BOOKING RECEIPT', 105, 20, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Booking Confirmation', 20, 40);
    doc.setFontSize(10);
    doc.text(`Booking ID: #${id}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 58);
    doc.text(`Status: CONFIRMED`, 20, 66);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('CarsRus Rental', 20, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Premium Car Rental Services', 20, 92);
    doc.text('Thank you for choosing CarsRus Rental!', 20, 100);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Important Information:', 20, 120);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('- Your car has been reserved and blocked in our system', 20, 130);
    doc.text('- You will receive a confirmation email shortly', 20, 138);
    doc.text('- Please bring this receipt and valid ID at pickup', 20, 146);
    doc.text('- Contact us for any questions or changes', 20, 154);
    doc.setFontSize(8);
    doc.text('This is a computer-generated receipt', 105, 280, { align: 'center' });
    
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