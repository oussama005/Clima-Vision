import { Footer } from "./Footer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useRef } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner"; // ou un autre système de notification

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs.sendForm(
      'service_l12fl94', // Remplacez par votre service ID EmailJS
      'template_iq8owus', // Remplacez par votre template ID
      form.current,
      'TPf4NWonRBk5gGyK-' // Remplacez par votre clé publique EmailJS
    )
    .then(() => {
        toast.success('Message sent successfully!');
        form.current?.reset();
    })
    .catch((error) => {
        toast.error('Failed to send message. Please try again.');
        console.error('Error sending email:', error);
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            {/* Vos champs de formulaire existants */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-muted-foreground">
                  Full Name
                </label>
                <Input name="user_name" id="name" placeholder="Your name" className="py-6" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-muted-foreground">
                  Email Address
                </label>
                <Input name="user_email" id="email" type="email" placeholder="your@email.com" className="py-6" required />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 font-medium text-muted-foreground">
                Subject
              </label>
              <Input name="subject" id="subject" placeholder="How can we help?" className="py-6" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-muted-foreground">
                Message
              </label>
              <Textarea 
                name="message"
                id="message" 
                rows={6} 
                placeholder="Tell us about your inquiry..." 
                className="min-h-[150px]"
                required 
              />
            </div>
            <Button type="submit" className="w-full py-6 text-lg">
              Send Message
            </Button>
          </form>
        </div>
      <div className="bg-secondary/5 rounded-xl p-8 h-full">
        <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full mt-1">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <p className="text-muted-foreground">support@climavision.com</p>
   
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full mt-1">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
            <h3 className="font-medium mb-1">Phone</h3>
              <p className="text-muted-foreground">+212 (6) 123-4567</p>
              <p className="text-muted-foreground">Mon-Fri, 9am-5pm </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full mt-1">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
            <h3 className="font-medium mb-1">Headquarters</h3>
              <p className="text-muted-foreground"> Weather Lane</p>
              <p className="text-muted-foreground">Marrakesh, UPM , MOR</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-medium mb-4">Follow Us</h3>
          <div className="flex gap-4">
            {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="bg-background p-3 rounded-full hover:bg-secondary/10 transition-colors"
                aria-label={`Follow on ${social}`}
              >
                <span className="sr-only">{social}</span>
                {/* Icons would be implemented here */}
              </a>
            ))}
          </div>
        </div>
      </div>
      </div>
      <Footer className="mt-10"/>
    </>
  );
}