import { z } from 'zod'

export const preferencesSchema = z.object({
  theme: z.enum(['light', 'dark']),
  language: z.enum(['en', 'hi']),
  region: z.enum(['US', 'IN', 'GB', 'DE']),
})

export type PreferencesSchema = z.infer<typeof preferencesSchema>