import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const currentUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("users"),
    isPro: v.boolean(),
  },
  handler: async (ctx, args) => {
    const updateDesignSize = await ctx.db.patch(args.id, {
      isPro: args.isPro,
    });
    return updateDesignSize;
  },
});
