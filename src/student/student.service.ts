import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaginationDTO, IStudent, IStudentDTO } from 'src/dto/student.dto';
import { User } from 'src/schemas/user.schema';
import { StudentRepository } from './student.repository';

/**
 * exec() function is used to execute the query. 
 * It can handle promises and executes the query easily.
 * The callback can be passed as an optional parameter to handle errors and results
 */


@Injectable()
export class StudentService {

    constructor(
        private readonly studentRepository: StudentRepository,
        @InjectModel('Student') private studentModel: Model<IStudent>

    ) { }

    async createStudent(data: IStudentDTO, user: User) {
        const studentObj = { ...data, user: user._id }
        return this.studentRepository.create(studentObj)
    }

    async getAllStudents(): Promise<IStudent[]> {
        return this.studentRepository.find({})
    }


    async getStudent(id: string) {
        return this.studentRepository.findOne({ _id: id })
    }

    async updateStudent(id: string, data: IStudentDTO): Promise<IStudent> {
        return this.studentRepository.findOneAndUpdate({ _id: id }, data)
    }

    async deleteStudent(id: string): Promise<IStudent> {
        return this.studentRepository.findOneAndDelete({ _id: id })
    }

    async studentPagination(data: IPaginationDTO) {
        const { page, limit, name } = data;


        let filter = {};

        if(name) filter = {name} 

        // filter = name ? { name } : {}

        console.log('filterfilter',filter);
        
        return this.studentRepository.pagination(filter, page, limit)

    }
}
