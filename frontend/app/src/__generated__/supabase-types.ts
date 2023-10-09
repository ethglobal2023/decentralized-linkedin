export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      attestations: {
        Row: {
          attester_address: string
          created_at: string
          document: Json
          eas_schema_address: string
          expiration_time: number
          id: string
          issuer_address: string
          recipient_address: string
          refuid: string
          revoked: boolean
          type: string
        }
        Insert: {
          attester_address: string
          created_at?: string
          document: Json
          eas_schema_address: string
          expiration_time: number
          id: string
          issuer_address?: string
          recipient_address: string
          refuid: string
          revoked?: boolean
          type: string
        }
        Update: {
          attester_address?: string
          created_at?: string
          document?: Json
          eas_schema_address?: string
          expiration_time?: number
          id?: string
          issuer_address?: string
          recipient_address?: string
          refuid?: string
          revoked?: boolean
          type?: string
        }
        Relationships: []
      }
      people_search: {
        Row: {
          created_at: string
          json: Json | null
          pk: string
          text: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          json?: Json | null
          pk: string
          text?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          json?: Json | null
          pk?: string
          text?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
