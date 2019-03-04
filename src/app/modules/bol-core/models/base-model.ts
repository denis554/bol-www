export class BaseModel<T> {
    constructor(private data: T) {
    }

    getDataKeyValue(key: string): any {
        return this.data[key];
    }
}
