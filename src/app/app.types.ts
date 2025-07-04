import { RequestHandler } from "msw";
import { JSX } from "react";
import { RouteObject } from "react-router-dom";
import { User } from "@/domains/auth/auth.types";

export enum Locale {
  EN = "en",
  ES = "es",
}

export type LocaleResources = Record<
  Locale,
  { translation: Record<string, string> }
>;

export interface MenuItem {
  title: string;
  children?: MenuItem[];
  icon?: JSX.Element;
  path?: string;
  isActive?: (location: Location, path?: string) => boolean;
  isAllowed?: (user: User) => boolean;
  priority?: number;
}

export interface Module {
  name: string;
  parent?: string;
  locales?: LocaleResources;
  menuItems?: MenuItem[];
  routes?: RouteObject[];
  // all module mock handlers
  mockHandlers?: RequestHandler[];
  // all module permissions definitions
  permissions?: string[];
}
