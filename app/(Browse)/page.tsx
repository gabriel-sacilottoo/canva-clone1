import Templates from "@/components/design/sidebar/Templates";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";

export default function Home() {
  return (
    <div className="space-y-20 mb-4 mt-20">
      <Hero />
      <Pricing />
      <div className="mx-10 lg:mx-20">
        <Templates />
      </div>
    </div>
  );
}
