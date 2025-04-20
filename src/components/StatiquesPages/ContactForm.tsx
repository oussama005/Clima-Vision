//contactform.tsx
import { Footer } from "./Footer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function ContactForm() {
  return (
    <>
    <form className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Nom complet
          </label>
          <Input id="name" placeholder="Votre nom" required />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <Input id="email" type="email" placeholder="votre@email.com" required />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block mb-1 font-medium">
          Sujet
        </label>
        <Input id="subject" placeholder="Objet de votre message" />
      </div>
      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Message
        </label>
        <Textarea id="message" rows={5} placeholder="Votre message..." required />
      </div>
      <Button type="submit" className="w-full">
        Envoyer le message
      </Button>
    </form>
    <Footer className="mt-8" />
    </>
  );
}