import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new desing
export const createDesign = mutation({
  args: {
    height: v.float64(),
    isPro: v.boolean(),
    published: v.boolean(),
    json: v.any(),
    title: v.string(),
    width: v.float64(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthenticated");
    }
    const newDesignId = await ctx.db.insert("design", {
      height: args.height,
      isPro: args.isPro,
      published: args.published,
      json: args.json,
      title: args.title,
      userId: userId,
      width: args.width,
      category: args.category,
      thumbnailUrl: "",
    });
    return newDesignId;
  },
});

export const designs = query(async (ctx) => {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new Error("Unauthenticated");
  }
  const design = await ctx.db
    .query("design")
    .filter((q) => q.eq(q.field("userId"), userId))
    .collect();
  return design;
});

export const deleteDesign = mutation({
  args: { id: v.id("design") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthenticated");
    }
    const deletedDesignId = await ctx.db.delete(args.id);
    return deletedDesignId;
  },
});

export const publishedDesigns = query(async (ctx) => {
  //   console.log("Write and test your query function here!");
  const designs = ctx.db
    .query("design")
    .filter((q) => q.eq(q.field("published"), true))
    .collect();
  // console.log(designs);
  return designs;
});

// Return the last 100 tasks in a given task list.
export const getDesign = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthenticated");
    }
    const design = await ctx.db
      .query("design")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique();
    return design;
  },
});

export const updateDesign = mutation({
  args: {
    id: v.id("design"),
    json: v.optional(v.any()),
    thumbnailUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthenticated");
    }
    // console.log(args);
    const updateDesignId = await ctx.db.patch(args.id, {
      json: args.json,
      thumbnailUrl: args.thumbnailUrl,
    });
    return updateDesignId;
  },
});

export const updateTitle = mutation({
  args: {
    id: v.id("design"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthenticated");
    }
    const updateDesignId = await ctx.db.patch(args.id, {
      title: args.title,
    });
    return updateDesignId;
  },
});

export const publish = mutation({
  args: {
    id: v.id("design"),
    published: v.boolean(),
    isPro: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthenticated");
    }
    const updateDesignId = await ctx.db.patch(args.id, {
      published: args.published,
      isPro: args.isPro,
    });
    return updateDesignId;
  },
});

export const updateSize = mutation({
  args: {
    id: v.id("design"),
    height: v.float64(),
    width: v.float64(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthenticated");
    }
    const updateDesignSize = await ctx.db.patch(args.id, {
      height: args.height,
      width: args.width,
    });
    return updateDesignSize;
  },
});
