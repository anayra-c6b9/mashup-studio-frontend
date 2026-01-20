import { Track } from "./interface/allTypes";

const API_BASE = "http://localhost:5500";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  // Try to parse JSON either way (so you can see error messages too)
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new Error(
      data?.error ?? `Request failed: ${res.status} ${res.statusText}`,
    );
  }
  return data as T;
}

// 1) POST /api/rooms/create (no payload)
export function createRoom() {
  return request<{ code: string }>("/api/rooms/create", {
    method: "POST",
  });
}

// 2) POST /api/rooms/join (room code payload)
export function joinRoom(roomCode: string) {
  return request<{ ok: boolean; roomId?: string }>("/api/rooms/join", {
    method: "POST",
    body: JSON.stringify({ roomCode }),
  });
}

// 3) GET /api/library (returns JSON list)
export function getLibrary() {
  return request<Track[]>("/api/library", {
    method: "GET",
  });
}
