export class Tag {
    constructor(
        private id: string,
        private tag_name: string
    ){}

    getTagName(): string {
        return this.tag_name
    }

    getTagId(): string {
        return this.id
    }

    static toTagModel(tag: any): Tag {
        return new Tag(
            tag.id,
            tag.tag_name
        )
    }
}