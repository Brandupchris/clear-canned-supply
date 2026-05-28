import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const DamagedMissing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <h1 className="type-display-sm mb-8">Damaged & Missing Items</h1>
        <p className="text-muted-foreground">Policy content coming soon.</p>
      </main>
      <Footer />
    </div>
  );
};

export default DamagedMissing;
