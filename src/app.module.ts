import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AgencyModule } from './agency/agency.module';
import { DonationModule } from './donation/donation.module';
import { PredictModule } from './predict/predict.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    AgencyModule,
    DonationModule,
    PredictModule,
    ItemsModule,
  ],
})
export class AppModule {}
