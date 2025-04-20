//teamPgae.tsx
import { Linkedin, Github, Award } from "lucide-react";
import { Footer } from "./Footer";

const teamMembers = [
  {
    name: "Oussama Belfakir",
    role: "CEO & Founder",
    bio: "Full-stack developer with expertise in cloud architecture and AI systems.",
    image: "/oussama.jpeg"
  },
  {
    name: "Malak Rochdi",
    role: "UX/UI Designer",
    bio: "Creates intuitive user experiences with a focus on accessibility.",
    image: "malak.jpeg"
  },
  {
    name: "Aimrane Zaroual",
    role: "Lead Developer",
    bio: "Specializes in data processing and machine learning algorithms.",
    image: "/aimrane.jpeg"
  },
 
  {
    name: "Zouhair El Garouni",
    role: "Data Scientist",
    bio: "Develops predictive models for weather pattern analysis.",
    image: "/zouhair.jpeg"
  }
];

export default function TeamPage() {
  return (
    <div className="bg-background">
      <section className="relative py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The passionate experts behind ClimaVision's innovation
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-background rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary mb-3">{member.role}</p>
                  <p className="text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary">
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-background px-4 py-2 rounded-full border mb-4">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">We're Hiring</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals passionate about weather technology
          </p>
          {/* <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            View Open Positions
          </Link> */}
        </div>
      </section>
         <Footer />
    </div>
  );
}