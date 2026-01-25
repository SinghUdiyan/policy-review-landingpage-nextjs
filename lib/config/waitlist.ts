/**
 * Waitlist mode switch.
 * Set NEXT_PUBLIC_WAITLIST_MODE=true in .env to enable waitlist (launch) mode.
 * Set to false or omit to show full site with policy review functionality.
 */
export function isWaitlistMode(): boolean {
  return process.env.NEXT_PUBLIC_WAITLIST_MODE === "true";
}
