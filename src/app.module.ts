import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { StoresModule } from './modules/stores/stores.module';
import { ShiftsModule } from './modules/shifts/shifts.module';
import { SalesModule } from './modules/sales/sales.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CompanyModule } from './modules/company/company.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { SessionsModule } from './modules/sessions/sessions.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    CategoriesModule,
    SupabaseModule,
    StoresModule,
    ShiftsModule,
    SalesModule,
    UsersModule,
    AuthModule,
    ProfileModule,
    CompanyModule,
    OrganizationsModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
