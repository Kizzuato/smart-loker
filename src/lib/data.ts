// lib/data.ts
export type AccessLog = {
  id: number;
  status: string;
  timestamp: string;
};

export const logs: AccessLog[] = [];
