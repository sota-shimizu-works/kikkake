import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const users = z
  .object({
    id: z.string().uuid(),
    email: z.string().optional(),
    display_name: z.string().optional(),
    avatar_url: z.string().optional(),
    is_onboarded: z.boolean().default(false),
    raw_user_meta_data: z.unknown().optional(),
    created_at: z.string().default("now()"),
    updated_at: z.string().default("now()"),
  })
  .passthrough();

export const schemas = {
  users,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/",
    alias: "get",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/users",
    alias: "getUsers",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "email",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "display_name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "avatar_url",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "is_onboarded",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "raw_user_meta_data",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "created_at",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "updated_at",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "select",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "order",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "Range",
        type: "Header",
        schema: z.string().optional(),
      },
      {
        name: "Range-Unit",
        type: "Header",
        schema: z.string().optional().default("items"),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "Prefer",
        type: "Header",
        schema: z.literal("count=none").optional(),
      },
    ],
    response: z.array(users),
  },
  {
    method: "post",
    path: "/users",
    alias: "postUsers",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `users`,
        type: "Body",
        schema: users,
      },
      {
        name: "select",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "Prefer",
        type: "Header",
        schema: z
          .enum([
            "return=representation",
            "return=minimal",
            "return=none",
            "resolution=ignore-duplicates",
            "resolution=merge-duplicates",
          ])
          .optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/users",
    alias: "deleteUsers",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "email",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "display_name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "avatar_url",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "is_onboarded",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "raw_user_meta_data",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "created_at",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "updated_at",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "Prefer",
        type: "Header",
        schema: z
          .enum(["return=representation", "return=minimal", "return=none"])
          .optional(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/users",
    alias: "patchUsers",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `users`,
        type: "Body",
        schema: users,
      },
      {
        name: "id",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "email",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "display_name",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "avatar_url",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "is_onboarded",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "raw_user_meta_data",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "created_at",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "updated_at",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "Prefer",
        type: "Header",
        schema: z
          .enum(["return=representation", "return=minimal", "return=none"])
          .optional(),
      },
    ],
    response: z.void(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
