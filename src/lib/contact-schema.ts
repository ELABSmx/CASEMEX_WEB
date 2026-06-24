import { z } from "zod";

/**
 * Shared quote-request schema (client validation + server validation).
 * `website` is a honeypot: real users never see or fill it. If present,
 * the server silently drops the submission.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  product: z.enum(["arabica", "robusta", "both", "specialty"]),
  grade: z.string().trim().max(120).optional().or(z.literal("")),
  volume: z.string().trim().max(120).optional().or(z.literal("")),
  certification: z.enum(["none", "usda", "ocia", "fourc", "fairtrade", "other"]),
  message: z.string().trim().min(1).max(2000),
  // Honeypot — real users never fill it. Accepted by the schema (any value) so
  // the route can validate the rest and then silently drop bots that fill it.
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const PRODUCT_VALUES = ["arabica", "robusta", "both", "specialty"] as const;
export const CERT_VALUES = ["none", "usda", "ocia", "fourc", "fairtrade", "other"] as const;
