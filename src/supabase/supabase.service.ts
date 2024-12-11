import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabaseClient: SupabaseClient,
  ) {}

  async getData(table: string) {
    const data = await this.supabaseClient.from(table).select('*');
    if (data.error) {
      throw new Error(`Supabase error: ${data.error.message}`);
    }

    return data.data;
  }
}
