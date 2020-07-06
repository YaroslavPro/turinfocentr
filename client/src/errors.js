export class ValidationError extends Error {
    constructor(data) {
        super('Некорректные данные формы');
        this.name = "ValidationError";
        this.data = data;
    }
}

export const transformApiErrors = data => {
    const errors = new Map();
    data.forEach(error => errors.set(error.param, error.msg));
    return Object.fromEntries(errors);
}