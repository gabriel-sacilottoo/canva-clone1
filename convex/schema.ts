import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.any()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isPro: v.optional(v.boolean()),
  }).index("email", ["email"]),
  design: defineTable({
    title: v.string(),
    userId: v.string(),
    json: v.any(),
    height: v.float64(),
    width: v.float64(),
    thumbnailUrl: v.optional(v.string()),
    category: v.string(),
    isPro: v.boolean(),
    published: v.boolean(),
  }),
  images: defineTable({
    userId: v.string(),
    images: v.array(v.string()),
  }),
});

export default schema;
