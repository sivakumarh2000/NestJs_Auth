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
        console.log('studentObjstudentObj', studentObj);

        // const student = new this.studentModel(studentObj);
        // return await student.save()
        return this.studentRepository.create(studentObj)
    }

    async getAllStudents(): Promise<IStudent[]> {
        // return await this.studentModel.find().exec()
        return this.studentRepository.find({})
    }


    async getStudent(id: string): Promise<IStudent> {
        return await this.studentModel.findById(id).exec()
        // return this.studentRepository.findOne({id})
    }

    async updateStudent(id: string, data: IStudentDTO): Promise<IStudent> {
        // return await this.studentModel.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
        return this.studentRepository.findOneAndUpdate({ _id: id }, data)
    }

    async deleteStudent(id: string): Promise<IStudent> {
        // return await this.studentModel.findOneAndDelete({ _id: id }).exec()
        return this.studentRepository.findOneAndDelete({_id:id})
    }

    async studentPagination(data: IPaginationDTO): Promise<IStudent[]> {
        const { page, limit } = data;
        // return await this.studentModel.find().skip(skip).limit(limit).exec()
        return this.studentRepository.pagination({},page,limit)
    }
}
