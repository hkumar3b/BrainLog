import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/infrastructure/prisma.module';
import { UserModule } from './modules/users/presentation/user.module';

@Module({
  imports: [PrismaModule, UserModule],
})
export class AppModule {}
