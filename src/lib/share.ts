"use client";

/**
 * Encode a small JSON payload into a URL-safe base64 string. The payload is
 * the user's current selection (and transforms, for the Real view), so that a
 * shared URL deep-links to a built workspace.
 *
 * Format is tiny and opaque on purpose — we just need round-trip support,
 * not human-readable URLs.
 */

function b64UrlEncode(input: string): string {
  if (typeof window === "undefined") return "";
  const bytes = new TextEncoder().encode(input);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return window
    .btoa(bin)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64UrlDecode(input: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    const pad = "=".repeat((4 - (input.length % 4)) % 4);
    const std = input.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const bin = window.atob(std);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export function encodePayload(payload: unknown): string {
  return b64UrlEncode(JSON.stringify(payload));
}

export function decodePayload<T>(encoded: string): T | null {
  const raw = b64UrlDecode(encoded);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

const SHARE_KEY = "s";

export function buildShareUrl(basePath: string, payload: unknown): string {
  if (typeof window === "undefined") return basePath;
  const url = new URL(basePath, window.location.origin);
  url.searchParams.set(SHARE_KEY, encodePayload(payload));
  return url.toString();
}

export function readSharedPayload<T>(): T | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get(SHARE_KEY);
  if (!raw) return null;
  return decodePayload<T>(raw);
}

export function clearSharedPayload(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (!url.searchParams.has(SHARE_KEY)) return;
  url.searchParams.delete(SHARE_KEY);
  window.history.replaceState({}, "", url.toString());
}
