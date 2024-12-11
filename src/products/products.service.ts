import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabaseClient: SupabaseClient,
  ) {}

  async getAllProducts() {
    const { data, error } = await this.supabaseClient
      .from('products')
      .select('*');
    if (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
    return data;
  }

  async addProduct(product: { name: string; category: string }) {
    const { data, error } = await this.supabaseClient
      .from('products')
      .insert([product]);
    if (error) {
      throw new Error(`Error adding product: ${error.message}`);
    }
    return data;
  }

  async updateProduct(
    id: string,
    updates: { name?: string; category?: string },
  ) {
    const { data, error } = await this.supabaseClient
      .from('products')
      .update(updates)
      .eq('id', id);
    if (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
    return data;
  }

  async deleteProduct(id: string) {
    const { data, error } = await this.supabaseClient
      .from('products')
      .delete()
      .eq('id', id);
    if (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
    return data;
  }
}
