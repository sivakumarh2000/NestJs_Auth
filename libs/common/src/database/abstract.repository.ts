import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import {
    FilterQuery,
    Model,
    Types,
    UpdateQuery,
    SaveOptions,
    Connection,
} from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger;

    constructor(
        protected readonly model: Model<TDocument>,
        private readonly connection: Connection,
    ) { }

    async create(
        document: Omit<TDocument, '_id'>,
        options?: SaveOptions,
    ): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });
        return (
            await createdDocument.save(options)
        ).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });

        if (!document) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new NotFoundException('Document not found.');
        }

        return document;
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>,
    ) {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {
            lean: true,
            new: true,
        });

        if (!document) {
            this.logger.warn(`Document not found with filterQuery:`, filterQuery);
            throw new NotFoundException('Document not found.');
        }

        return document;
    }

    async findOneAndDelete(
        filterQuery: FilterQuery<TDocument>,
    ) {
        const document = await this.model.findOneAndDelete(filterQuery);

        if (!document) {
            this.logger.warn(`Document not found with filterQuery:`, filterQuery);
            throw new NotFoundException('Document not found.');
        }

        return document;
    }

    async upsert(
        filterQuery: FilterQuery<TDocument>,
        document: Partial<TDocument>,
    ) {
        return this.model.findOneAndUpdate(filterQuery, document, {
            lean: true,
            upsert: true,
            new: true,
        });
    }

    async find(filterQuery: FilterQuery<TDocument>) {
        return this.model.find(filterQuery, {}, { lean: true });
    }



    async startTransaction() {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }


    async findById(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });

        if (!document) {
            this.logger.warn('Document not found with filterQuery', filterQuery);
            throw new NotFoundException('Document not found.');
        }

        return document;
    }

    async pagination(filterQuery: FilterQuery<TDocument>, page: number, limit: number) {
        const skip = (page - 1) * limit;

        const data = await this.model.find({ ...filterQuery }).skip(skip).limit(limit).exec()

        const totalcount = await this.model.countDocuments({ ...filterQuery })


        const pagination = {
            currentpage: Number(page),
            limit: Number(limit),
            totalcount,
            totalpages: Math.ceil(totalcount/limit)

        };
        return {data, pagination };
    }
}