import { useState } from "react";

import { Input } from "@/components/ui/input";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";

const DesignInput = ({
  name,
  id,
}: {
  name: string | undefined;
  id: string | undefined;
}) => {
  if (!name) return null;
  const [title, setTitle] = useState(name);
  const { mutate, pending } = useApiMutation(api.design.updateTitle);
  const { isOnline } = useNetworkStatusStore();

  //   console.log(title, name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log(title, name);
    e.preventDefault();
    await mutate({
      id,
      title: title,
    }).catch((error) => {
      console.log(error);
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Design Name"
        required
        className="bg-transparent border-none font-bold"
        disabled={pending || !isOnline}
      />
    </form>
  );
};

export default DesignInput;
