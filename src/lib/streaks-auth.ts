const STORAGE_KEY = "streaks_authed"

export function isStreaksAuthed(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(STORAGE_KEY) === "true"
}

export function setStreaksAuthed(): void {
  localStorage.setItem(STORAGE_KEY, "true")
}
