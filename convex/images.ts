import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new desing
export const createImages = mutation({
  args: {
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthenticated");
    }
    const newImages = await ctx.db.insert("images", {
      userId: userId,
      images: args.images,
    });
    return newImages;
  },
});

export const getImages = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthenticated");
    }
    const images = await ctx.db
      .query("images")
      .filter((q) => q.eq(q.field("userId"), userId))
      .unique();
    return images;
  },
});
// update user images
export const updateImages = mutation({
  args: {
    id: v.id("images"),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthenticated");
    }
    // console.log(args);
    const updateImagesId = await ctx.db.patch(args.id, {
      images: args.images,
    });
    return updateImagesId;
  },
});
