import { NotFoundError } from "../error/NotFoundError"
import { Tag } from "../model/Tags"
import { BaseDataBase } from "./BaseDatabase"

export class TagsDatabase extends BaseDataBase {

    public async createTag (
        tag: Tag
    ): Promise<void> {
        try {
            await this.getconnection()
            .insert({
                id: tag.getTagId(),
                tag_name: tag.getTagName()
            })
            .into(this.tableNames.tags)
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }

    public async getTagByName (
        input: Tag
    ): Promise<Tag> {
        try {
            const tag = await this.getconnection()

                .select("*")
                .from(this.tableNames.tags)
                .where({tag_name: input.getTagName()})

            if(!tag[0]) {
                try {
                    await this.createTag(input)
                } catch (error: any) {
                    throw new Error(error.message || error.sqlMessage) 
                }
            }
            
            return Tag.toTagModel(tag[0])
            
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage)
        }
    }
}