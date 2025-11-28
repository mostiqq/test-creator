import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { TestModule } from './test/test.module';

@Module({
	imports: [PrismaModule, AuthModule, TestModule]
})
export class AppModule {}
