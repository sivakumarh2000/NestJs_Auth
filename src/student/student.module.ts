import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from 'src/schemas/student.schema';
import { AuthModule } from 'src/auth/auth.module';
import { StudentRepository } from './student.repository';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
    {
      name: "Student",
      schema: StudentSchema,
    }
  ])

],
  controllers: [StudentController],
  providers: [StudentService,StudentRepository]
})
export class StudentModule { }
