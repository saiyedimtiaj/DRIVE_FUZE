import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail, Clock } from "lucide-react";

export default function ComplaintsPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="relative overflow-hidden bg-white py-12">
        <div className="absolute inset-0">
          <div className="absolute right-0 w-1/2 h-full dots-pattern opacity-20"></div>
          <div className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-burgundy/10 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Complaints Procedure
          </h1>
          <p className="text-lg text-primary/80 max-w-2xl">
            We strive to provide excellent service, but if something&apos;s not
            right, we want to hear about it and make it better.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Phone className="h-12 w-12 text-burgundy mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-primary/80 mb-4">
              Call us directly to discuss your concerns
            </p>
            <p className="font-medium">0800 123 4567</p>
            <p className="text-sm text-primary/60">Mon-Fri: 9am-6pm</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Mail className="h-12 w-12 text-burgundy mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-primary/80 mb-4">
              Send us a detailed description
            </p>
            <p className="font-medium">complaints@drivefuze.com</p>
            <p className="text-sm text-primary/60">Response within 24 hours</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <MessageSquare className="h-12 w-12 text-burgundy mb-4" />
            <h3 className="text-xl font-semibold mb-2">Online Form</h3>
            <p className="text-primary/80 mb-4">Submit your complaint online</p>
            <Button className="w-full bg-burgundy hover:bg-burgundy/90 text-white">
              Start Complaint
            </Button>
          </Card>
        </div>

        {/* Process */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Complaints Process</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-burgundy text-white flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
                <p className="text-primary/80">
                  Contact us through your preferred method with details of your
                  complaint. Include any relevant information or documentation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-burgundy text-white flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Acknowledgment</h3>
                <p className="text-primary/80">
                  We&apos;ll acknowledge your complaint within 24 hours and
                  provide you with a reference number.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-burgundy text-white flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Investigation</h3>
                <p className="text-primary/80">
                  Our team will investigate your complaint thoroughly and keep
                  you updated on our progress.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-burgundy text-white flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Resolution</h3>
                <p className="text-primary/80">
                  We aim to resolve all complaints within 5 working days and
                  will provide you with a detailed response.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <Card className="p-8 bg-burgundy-50">
          <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
          <p className="text-primary/80 mb-6">
            We are committed to treating all complaints seriously and using your
            feedback to improve our service. If you&apos;re not satisfied with
            our initial response, you can escalate your complaint to our senior
            management team.
          </p>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-burgundy" />
            <p className="text-sm text-primary/80">
              We aim to resolve most complaints within 5 working days
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
