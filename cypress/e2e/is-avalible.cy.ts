import { URL_FOR_TESTS } from "../../src/constants/test-constants"

describe('application is available', function () {
    it('should be available on URL_FOR_TESTS', function () {
        cy.visit(URL_FOR_TESTS);
    });
});