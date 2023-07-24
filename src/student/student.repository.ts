import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Student } from "src/schemas/student.schema";


@Injectable()
export class StudentRepository extends AbstractRepository<Student> {
    protected readonly logger = new Logger(StudentRepository.name);


    constructor(
        @InjectModel(Student.name) studnetModel: Model<Student>,
        //It Allows to pass up the connection to the Abstract Repository
        @InjectConnection() connection: Connection
    ) {
        //Passing Up To The Abstract Repository
        super(studnetModel, connection)
        this.logger.log('hello')
    }

}