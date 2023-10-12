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
          ref_uid: string
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
          ref_uid: string
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
          ref_uid?: string
          revoked?: boolean
          type?: string
        }
        Relationships: []
      }
      ipfs_cache: {
        Row: {
          body: string | null
          cid: string
          content_type: string | null
          created_at: string
          gateway: string | null
          json: Json | null
          status: number | null
        }
        Insert: {
          body?: string | null
          cid: string
          content_type?: string | null
          created_at?: string
          gateway?: string | null
          json?: Json | null
          status?: number | null
        }
        Update: {
          body?: string | null
          cid?: string
          content_type?: string | null
          created_at?: string
          gateway?: string | null
          json?: Json | null
          status?: number | null
        }
        Relationships: []
      }
      manual_review_inbox: {
        Row: {
          account: string
          cid: string
          created_at: string
          fulfilled: boolean
          id: number
          media_type: string
        }
        Insert: {
          account: string
          cid: string
          created_at?: string
          fulfilled: boolean
          id?: number
          media_type: string
        }
        Update: {
          account?: string
          cid?: string
          created_at?: string
          fulfilled?: boolean
          id?: number
          media_type?: string
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
      talent_layer: {
        Row: {
          address: string | null
          cid: string | null
          document: Json | null
          id: string
        }
        Insert: {
          address?: string | null
          cid?: string | null
          document?: Json | null
          id: string
        }
        Update: {
          address?: string | null
          cid?: string | null
          document?: Json | null
          id?: string
        }
        Relationships: []
      }
      tmptmptmpt_http: {
        Row: {
          content: string | null
          content_type: string | null
          headers: unknown[] | null
          status: number | null
        }
        Insert: {
          content?: string | null
          content_type?: string | null
          headers?: unknown[] | null
          status?: number | null
        }
        Update: {
          content?: string | null
          content_type?: string | null
          headers?: unknown[] | null
          status?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      talent_layer_formated: {
        Row: {
          json: Json | null
          pubkey: string | null
        }
        Relationships: []
      }
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
      human_text_from_json_jsonbin: {
        Args: {
          "": Json
        }
        Returns: string
      }
      human_text_from_json_txin: {
        Args: {
          "": string
        }
        Returns: string
      }
      human_text_from_jsonb: {
        Args: {
          intext: Json
        }
        Returns: string
      }
      human_text_from_jsonbb: {
        Args: {
          "": Json
        }
        Returns: string
      }
      ipfs:
        | {
            Args: {
              _cid: string
            }
            Returns: {
              cid: string
              created_at: string
              status: number
              content_type: string
              gateway: string
              body: string
              json: Json
            }[]
          }
        | {
            Args: {
              incid: string
            }
            Returns: {
              cid: string
              status: number
              content_type: string
              body: string
              json: Json
            }[]
          }
      no_cache_ipfs: {
        Args: {
          _cid: string
        }
        Returns: {
          cid: string
          created_at: string
          status: number
          content_type: string
          gateway: string
          body: string
          json: Json
        }[]
      }
      people_websearch: {
        Args: {
          query: string
        }
        Returns: {
          pk: string
          text: string
          json: Json
          snippet: string
        }[]
      }
      save_ipfs: {
        Args: {
          _cid: string
        }
        Returns: {
          cid: string
          created_at: string
          status: number
          content_type: string
          gateway: string
          body: string
          json: Json
        }[]
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
      sync_talent_layer: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
