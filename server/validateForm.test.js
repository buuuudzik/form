const validateForm = require('./validateForm');

describe("validateForm should work properly", () => {
    it("should validate proper form", () => {
        const [errorMessage] = validateForm({
            firstName: "John",
            lastName: "Doe",
            email: "example@gmail.com",
            eventDate: Date.now(),
        });
        expect(errorMessage).toBeFalsy();
    });

    it("should has error when form hasn't some field", () => {
        const [errorMessage] = validateForm({
            firstName: "John",
            lastName: "Doe",
            email: "example@gmail.com",
        });
        expect(errorMessage).toMatch(/eventDate/);
    });

    it("should has error when form has some field empty", () => {
        const [errorMessage] = validateForm({
            firstName: "",
            lastName: "Doe",
            email: "example@gmail.com",
            eventDate: Date.now(),
        });
        expect(errorMessage).toMatch(/firstName/);
    });

    it("should has error when bad emails", () => {
        const badEmails = [
            "example.com",
            "exapme@com",
            "emd eed",
        ];

        badEmails.forEach(badEmail => {
            const [errorMessage] = validateForm({
                firstName: "John",
                lastName: "Doe",
                email: badEmail,
                eventDate: Date.now(),
            });
            expect(errorMessage).toMatch(/email/);
        });
    });
});