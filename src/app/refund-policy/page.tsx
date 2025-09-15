"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Clock, CreditCard, Phone, Mail } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Refund Policy
          </h1>
          <p className="text-muted-foreground">
            Dream Coaching - Bangladesh&apos;s Premier Online Learning Platform
          </p>
        </div>

        <div className="space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <RefreshCw className="h-5 w-5" />
                Refund Eligibility - Strict Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-red-800">No Refunds After Enrollment</h3>
                <p className="text-sm text-red-700">
                  All course fees are final and non-refundable. By enrolling, students accept this strict no-refund policy.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Exception - System Error Payments Only</h3>
                <p className="text-sm text-muted-foreground">
                  Refunds only considered for verified duplicate transactions or system processing errors within 24 hours of payment.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Technical Issues</h3>
                <p className="text-sm text-muted-foreground">
                  Student device, internet, or connectivity issues do not qualify for refunds. Only platform-wide outages exceeding 10 days may qualify for course credit (not cash refund).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Processing Timeline (System Errors Only)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Mobile Banking (bKash, Nagad, Rocket)</h3>
                  <p className="text-sm text-muted-foreground">10-15 business days</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Bank Transfer</h3>
                  <p className="text-sm text-muted-foreground">15-21 business days</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Credit/Debit Card</h3>
                  <p className="text-sm text-muted-foreground">21-30 business days</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">International Payments</h3>
                  <p className="text-sm text-muted-foreground">30-45 business days</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">*Processing fees and bank charges may apply</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                Claim Process (System Errors Only)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <div>
                    <h3 className="font-semibold">Submit Within 24 Hours</h3>
                    <p className="text-sm text-muted-foreground">Email support immediately with transaction proof and system error evidence</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <div>
                    <h3 className="font-semibold">Administrative Review</h3>
                    <p className="text-sm text-muted-foreground">Finance team investigates within 7-14 business days</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                  <div>
                    <h3 className="font-semibold">Management Decision</h3>
                    <p className="text-sm text-muted-foreground">Final decision by management - no appeals accepted</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">Strictly Non-Refundable</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• All course enrollments (regardless of completion)</li>
                <li>• Any accessed digital content or materials</li>
                <li>• Certificate and administrative fees</li>
                <li>• Promotional, discounted, or scholarship courses</li>
                <li>• Claims submitted after 24 hours of payment</li>
                <li>• Student dissatisfaction or change of mind</li>
                <li>• Personal circumstances or financial difficulties</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact for Refunds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+880 1700-000000</p>
                    <p className="text-xs text-muted-foreground">9 AM - 9 PM (Daily)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold">Email Support</p>
                    <p className="text-sm text-muted-foreground">refund@dreamcoaching.com</p>
                    <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <p className="text-sm text-red-800">
                <strong>⚠️ Important Notice:</strong> By enrolling, students acknowledge they have read and agreed to this strict No-Refund Policy. 
                Dream Coaching&apos;s decision on all financial matters is final and non-negotiable. 
                This policy complies with Bangladesh digital service regulations and consumer protection laws.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}