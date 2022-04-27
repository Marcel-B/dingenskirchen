import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthorizedModule } from './modules/authorized/authorized.module';
import { UnauthorizedModule } from './modules/unauthorized/unauthorized.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { AquarienModule } from './modules/aquarien/aquarien.module';
import { MessungenModule } from './modules/messungen/messungen.module';
import { DuengungenModule } from './modules/duengungen/duengungen.module';
import { TagebuchModule } from './modules/tagebuch/tagebuch.module';

@Module({
  controllers: [AppController],
  providers: [UsersService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthorizedModule,
    UnauthorizedModule,
    AquarienModule,
    MessungenModule,
    DuengungenModule,
    AuthModule,
    TagebuchModule,
  ],
})
export class AppModule {
}
