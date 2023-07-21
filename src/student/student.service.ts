import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaginationDTO, IStudent, IStudentDTO } from 'src/dto/student.dto';
import { User } from 'src/schemas/user.schema';

/**
 * exec() function is used to execute the query. 
 * It can handle promises and executes the query easily.
 * The callback can be passed as an optional parameter to handle errors and results
 */



@Injectable()
export class StudentService {

    constructor(@InjectModel('Student') private studentModel: Model<IStudent>) { }

    async createStudent(data: IStudentDTO,user:User): Promise<IStudent> {
        
        const studentObj = {...data,user:user._id}
        console.log('studentObjstudentObj',studentObj);
        
        const student = new this.studentModel(studentObj);
        return await student.save()
    }

    async getAllStudents(): Promise<IStudent[]> {
        return await this.studentModel.find().exec()
    }


    async getStudent(id: string): Promise<IStudent> {
        return await this.studentModel.findById(id).exec()
    }

    async updateStudent(id: string, data: IStudentDTO): Promise<IStudent> {
        return await this.studentModel.findOneAndUpdate({ _id: id }, data, { new: true }).exec()
    }

    async deleteStudent(id: string): Promise<IStudent> {
        return await this.studentModel.findOneAndDelete({ _id: id }).exec()
    }

    async studentPagination(data: IPaginationDTO): Promise<IStudent[]> {
        const { page, limit } = data;
        const skip = (page - 1) * limit;
        console.log('skipskipskip', skip);

        return await this.studentModel.find().skip(skip).limit(limit).exec()
    }
}
