export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      order_items: {
        Row: {
          created_at: string;
          id: string;
          order_id: string | null;
          price: number;
          product_id: string | null;
          quantity: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          order_id?: string | null;
          price: number;
          product_id?: string | null;
          quantity: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          order_id?: string | null;
          price?: number;
          product_id?: string | null;
          quantity?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          created_at: string;
          id: string;
          order_status: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          order_status?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          order_status?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profile";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          id: string;
          image_url: string | null;
          name: string;
          price: number;
          seller_id: string;
          sku: string | null;
          status: string;
          stock: number;
          sub_category: string | null;
          updated_at: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          description: string;
          id?: string;
          image_url?: string | null;
          name: string;
          price: number;
          seller_id: string;
          sku?: string | null;
          status: string;
          stock: number;
          sub_category?: string | null;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string | null;
          name?: string;
          price?: number;
          seller_id?: string;
          sku?: string | null;
          status?: string;
          stock?: number;
          sub_category?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      profile: {
        Row: {
          bio: string | null;
          created_at: string;
          date_of_birth: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          phone_number: string | null;
          profile_image_url: string | null;
          updated_at: string;
          username: string;
        };
        Insert: {
          bio?: string | null;
          created_at?: string;
          date_of_birth?: string | null;
          email?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          phone_number?: string | null;
          profile_image_url?: string | null;
          updated_at?: string;
          username: string;
        };
        Update: {
          bio?: string | null;
          created_at?: string;
          date_of_birth?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          phone_number?: string | null;
          profile_image_url?: string | null;
          updated_at?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_new_order: {
        Args: {
          user_id: string;
          items: Json;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
