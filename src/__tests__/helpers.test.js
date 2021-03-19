import { emailRegExp } from '../helpers';

describe('test helpers', () => {
    describe('test email regexp', () => {
        it('should pass "example@gmail.com"', () => {
            expect(emailRegExp.test("example@gmail.com")).toBeTruthy();
        });

        it('should not pass "examplegmail.com"', () => {
            expect(emailRegExp.test("examplegmail.com")).toBeFalsy();
        });

        it('should not pass "example @gmail.com"', () => {
            expect(emailRegExp.test("example @gmail.com")).toBeFalsy();
        });

        it('should not pass "example%@gmail.com"', () => {
            expect(emailRegExp.test("example @gmail.com")).toBeFalsy();
        });
    });
});