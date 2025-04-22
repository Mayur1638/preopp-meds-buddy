export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      emergency_contact: {
        Row: {
          contact_name: string | null
          contact_number: number | null
          contact_relation: string | null
          created_at: string
          id: string
        }
        Insert: {
          contact_name?: string | null
          contact_number?: number | null
          contact_relation?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          contact_name?: string | null
          contact_number?: number | null
          contact_relation?: string | null
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_contact_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "patient_table"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          created_at: string
          dosage: string | null
          end_date: string | null
          id: string
          medication_name: string | null
          medication_strengthosage: string | null
          special_instructions: string | null
          start_date: string | null
          time: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          dosage?: string | null
          end_date?: string | null
          id?: string
          medication_name?: string | null
          medication_strengthosage?: string | null
          special_instructions?: string | null
          start_date?: string | null
          time?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          dosage?: string | null
          end_date?: string | null
          id?: string
          medication_name?: string | null
          medication_strengthosage?: string | null
          special_instructions?: string | null
          start_date?: string | null
          time?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "patient_table"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_table: {
        Row: {
          allergies: string | null
          blood_group: string | null
          created_at: string
          gender: string | null
          id: string
          pateint_name: string | null
          patient_dob: string | null
          patient_height: number | null
          patient_weight: number | null
        }
        Insert: {
          allergies?: string | null
          blood_group?: string | null
          created_at?: string
          gender?: string | null
          id?: string
          pateint_name?: string | null
          patient_dob?: string | null
          patient_height?: number | null
          patient_weight?: number | null
        }
        Update: {
          allergies?: string | null
          blood_group?: string | null
          created_at?: string
          gender?: string | null
          id?: string
          pateint_name?: string | null
          patient_dob?: string | null
          patient_height?: number | null
          patient_weight?: number | null
        }
        Relationships: []
      }
      procedures: {
        Row: {
          created_at: string
          doctor_name: string | null
          hospital_name: string | null
          id: string
          procedure_date: string | null
          procedure_name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          doctor_name?: string | null
          hospital_name?: string | null
          id?: string
          procedure_date?: string | null
          procedure_name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          doctor_name?: string | null
          hospital_name?: string | null
          id?: string
          procedure_date?: string | null
          procedure_name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "procedures_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "patient_table"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
