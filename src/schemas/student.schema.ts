import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";


@Schema({
    timestamps: true
})

export class Student {

    @Prop()
    name: string;


    @Prop()
    age: number;

    @Prop()
    city: string;

    @Prop()
    initial: string;

    @Prop({type: mongoose.Schema.Types.ObjectId,ref:"User"})
    user: User

}

export const StudentSchema = SchemaFactory.createForClass(Student)
