const isString = v => typeof v === "string";
const isNumber = v => typeof v === "number";
const isObject = v => typeof v === "object" && v !== null;
const isObjectEmpty = v => Object.keys(v).length === 0;

const isEmailValid = (email) => {
    if (typeof email !== "string") return false;
    return !!`${email}`.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
};

const isDateValid = (date) => {
    return (typeof date === 'number' && !isNaN(date));
};

const isExisting = (name, data) => {
    const isSet = name in data;
    if (!isSet) return false;

    const value = data[name];
    if (isString(value) && value === "") return false;
    if (isNumber(value) && isNaN(value)) return false;
    
    return true;
};

const fields = [
    { name: "firstName", isRequired: true },
    { name: "lastName", isRequired: true },
    { name: "email", isRequired: true, isEmailValid: true },
    { name: "eventDate", isRequired: true, isDateValid: true },
];

const validateForm = (form = {}) => {
    if (!form || !isObject(form) || isObjectEmpty(form)) {
        return ["Form is empty"];
    }

    const validatedFields = {};

    for (let i=0; i<fields.length; i++) {
        const field = fields[i];
        const { name } = field;
        const exists = isExisting(name, form);
        const value = form[name];

        if (field.isRequired && !exists) {
            return [`Field '${name}' is required`];
        }

        if (field.isEmailValid && !isEmailValid(value)) {
            return [`Field '${name}' should be an email`];
        }

        if (field.isDateValid && !isDateValid(value)) {
            return [`Field '${name}' should be a date`];
        }

        validatedFields[name] = value;
    }

    return [null, validatedFields];
};

module.exports = validateForm;