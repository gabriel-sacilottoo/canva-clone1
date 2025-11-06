import { Id } from "@/convex/_generated/dataModel";

export interface designProps {
  _id: Id<"design">;
  _creationTime: number;
  thumbnailUrl?: string | undefined;
  isPro: boolean;
  title: string;
  userId: string;
  json: any;
  height: number;
  width: number;
  category: string;
  published: boolean;
}

export interface userProps {
  _id: Id<"users">;
  _creationTime: number;
  name?: string | undefined;
  image?: string | undefined;
  email?: string | undefined;
  emailVerificationTime?: number | undefined;
  phone?: string | undefined;
  phoneVerificationTime?: number | undefined;
  isPro?: boolean | undefined;
}
