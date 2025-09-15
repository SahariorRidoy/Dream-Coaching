"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft, Eye, Lock, Database, UserCheck, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                1. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support.</p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Personal Information includes:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name and contact information</li>
                  <li>Phone number and email address</li>
                  <li>Educational background and preferences</li>
                  <li>Payment and billing information</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-secondary" />
                2. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use the information we collect to provide, maintain, and improve our services.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Service Delivery</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Course enrollment and management</li>
                    <li>• Progress tracking and analytics</li>
                    <li>• Communication and support</li>
                  </ul>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-secondary mb-2">Improvement</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Platform optimization</li>
                    <li>• Content personalization</li>
                    <li>• User experience enhancement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-accent" />
                3. Information Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              <div className="bg-accent/10 p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">Security Measures:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                4. Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">We may share information:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>With service providers who assist in our operations</li>
                  <li>When required by law or legal process</li>
                  <li>To protect our rights and safety</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>5. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>You have certain rights regarding your personal information, including the right to access, update, or delete your data.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Access</h4>
                  <p className="text-sm">View your data</p>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-lg">
                  <UserCheck className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <h4 className="font-semibold">Update</h4>
                  <p className="text-sm">Modify your information</p>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold">Delete</h4>
                  <p className="text-sm">Remove your data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>6. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.</p>
              <p>You can control cookie settings through your browser preferences, though this may affect some functionality.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>7. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>8. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>9. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@dreamcoaching.com</p>
                <p><strong>Phone:</strong> +880 1309270105</p>
                <p><strong>Address:</strong> Dhaka, Bangladesh</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Your privacy is important to us. We are committed to protecting your personal information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/terms">Terms & Conditions</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}