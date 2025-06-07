export const UserRole = {
  USER: "user",
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
