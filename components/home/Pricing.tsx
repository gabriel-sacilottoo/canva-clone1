import PricingCard from "@/components/home/PricingCard";

const Pricing = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-10">
      <h1 className="text-2xl font-bold text-center">
        A perfect fit for everyone
      </h1>
      <div className="block lg:flex gap-4 space-y-2 lg:space-y-0">
        <PricingCard
          users="For One Person"
          priceName="Canva Free"
          description="For designing or working on anything"
        />
        <PricingCard
          users="For One Person"
          priceName="Canva Pro"
          description="For growing your brand or passion project with premium features"
        />
        <PricingCard
          users="For your team"
          priceName="Canva Teams"
          description="For teams to create together with with premium workplace tools and workflows"
        />
      </div>
    </div>
  );
};

export default Pricing;
