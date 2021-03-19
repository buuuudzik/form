import reducer from '../store/reducer';
import { actions } from '../store/reducer';

describe("reducer", () => {
    describe("FETCHING", () => {
        it("should set fetching to true", () => {
            const state = reducer({ fetching: false, fetchError: "Some error", submitted: false }, {
                type: actions.FETCHING
            });
    
            expect(state.fetching).toBeTruthy();
        });
        
        it("should clear fetchError", () => {
            const state = reducer({ fetching: false, fetchError: "Some error", submitted: false }, {
                type: actions.FETCHING
            });
            expect(state.fetchError).toBe('');
        });

        it("should set submitted to false", () => {
            const state = reducer({ fetching: false, fetchError: "Some error", submitted: false }, {
                type: actions.FETCHING
            });

            expect(state.submitted).toBeFalsy();
        });
    });
});