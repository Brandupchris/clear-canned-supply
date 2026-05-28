import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    toast({ title: "Message sent", description: "We'll get back to you shortly." });
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Contact Us</h1>
        <p className="text-muted-foreground mt-2 max-w-xl">
          Have a question about our products or need help with an order? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-5 gap-12 mt-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us more..." />
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {/* Info */}
          <div className="md:col-span-2 space-y-8 pt-1">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <a href="mailto:support@clearcans.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  clearcannedsupply@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Location</p>
                <p className="text-sm text-muted-foreground">104 South Tacoma Street, Pasco Washington 99301, United States                      </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>);

};

export default Contact;