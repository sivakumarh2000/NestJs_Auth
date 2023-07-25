import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { IStudent, IStudentDTO } from 'src/dto/student.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentController {
    //Only Read(using) the Service data,cannot change(Private)
    constructor(private readonly studentService: StudentService) { }


    @Post('')
    @UseGuards(AuthGuard())
    createStudent(@Body() data: IStudentDTO, @Req() req) {
        console.log('Userrrr', req.user);

        return this.studentService.createStudent(data, req.user)
    }

    @Get('')
    getAllStudents(): Promise<IStudent[]> {
        return this.studentService.getAllStudents()
    }


    @Get('/:id')
    getStudent(@Param('id') id: string) {
        return this.studentService.getStudent(id)
    }

    @Put('/:id')
    updateStudent(@Param('id') id: string, @Body() data: IStudentDTO): Promise<IStudent> {
        return this.studentService.updateStudent(id, data)
    }


    @Delete('/:id')
    deleteStudent(@Param('id') id: string): Promise<IStudent> {
        return this.studentService.deleteStudent(id)
    }

    // @UseGuards(AuthGuard())
    @Get('pagination/info')
    studentPagination(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('name') name: string
    ) {
        const data = { page, limit, name }
        console.log(data);

        return this.studentService.studentPagination(data)

    }
}
