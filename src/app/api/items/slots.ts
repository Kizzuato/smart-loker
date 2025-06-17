// File: /pages/api/fingerprint/slots.ts

import { NextApiRequest, NextApiResponse } from "next";

// Misal total slot = 10
const TOTAL_SLOTS = 10;

// Dummy data user fingerprint
const usedSlots = [1, 3, 5]; // Anggap ini slot yang sudah dipakai

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const slots = Array.from({ length: TOTAL_SLOTS }, (_, i) => ({
    id: i + 1,
    used: usedSlots.includes(i + 1),
  }));

  res.status(200).json({ success: true, data: slots });
}
