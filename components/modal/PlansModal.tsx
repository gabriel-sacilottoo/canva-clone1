import { Dialog, DialogContent } from "@/components/ui/dialog";
import Pricing from "@/components/home/Pricing";
import { usePricingStore } from "@/store/PricingStore";

const PlansModal = () => {
  const { isPricing, setIsPricing } = usePricingStore();
  if (isPricing) {
    return (
      <Dialog onOpenChange={setIsPricing} open={isPricing}>
        <DialogContent className="sm:max-w-5xl overflow-y-auto border-none">
          <Pricing />
        </DialogContent>
      </Dialog>
    );
  }
};

export default PlansModal;
