import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseScorers(scorersStr: string | null | undefined): string[] {
  if (!scorersStr || scorersStr === 'null') return [];
  try {
    // String is like: '{"J. Quiñones 9\'","R. Jiménez 67\'"}'
    // Remove outer brackets and split by comma
    const cleaned = scorersStr.replace(/^\{|\}$/g, '');
    if (!cleaned) return [];
    
    // Split by comma, but be careful of commas inside names (unlikely but possible)
    // Actually the API sends quotes inside the string, like: {"name 9'", "name 10'"}
    // Let's just remove all double quotes and split by comma.
    return cleaned.replace(/"/g, '').split(',').map(s => s.trim());
  } catch {
    return [];
  }
}
