import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from 'src/schemas/student.schema';
import { AuthModule } from 'src/auth/auth.module';

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
  providers: [StudentService]
})
export class StudentModule { }
