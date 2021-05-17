import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DatabaseConnectionService } from './db/db-connection.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { MemberModule } from './member/member.module';
import { BugsModule } from './bugs/bugs.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    MemberModule,
    BugsModule,
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}