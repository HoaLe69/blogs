export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          id: string
          post_slug: string
          name: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          post_slug: string
          name: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          post_slug?: string
          name?: string
          content?: string
          created_at?: string
        }
        Relationships: []
      }
      post_likes: {
        Row: {
          post_slug: string
          count: number
        }
        Insert: {
          post_slug: string
          count?: number
        }
        Update: {
          post_slug?: string
          count?: number
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
