/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as assignments from "../assignments.js";
import type * as collegeAuth from "../collegeAuth.js";
import type * as courses from "../courses.js";
import type * as events from "../events.js";
import type * as openai from "../openai.js";
import type * as seedData from "../seedData.js";
import type * as studyGroups from "../studyGroups.js";
import type * as types from "../types.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  assignments: typeof assignments;
  collegeAuth: typeof collegeAuth;
  courses: typeof courses;
  events: typeof events;
  openai: typeof openai;
  seedData: typeof seedData;
  studyGroups: typeof studyGroups;
  types: typeof types;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
