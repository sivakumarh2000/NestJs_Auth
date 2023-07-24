import { IsPositive } from "class-validator";
import { Document } from "mongoose";
import { User } from "src/schemas/user.schema";

export interface IStudentDTO {
    readonly name: string;
    readonly age: number;
    readonly city: string;
    readonly initial: string;
    readonly user: User
}


export interface IStudent extends Document {
    readonly name: string;
    readonly age: number;
    readonly city: string;
    readonly initial: string
}



export class IPaginationDTO {
    @IsPositive()
    page: number;
    limit: number
}
