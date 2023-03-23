import { URL_FOR_TESTS } from "../../src/constants/test-constants";

describe("app works correctly with routes", function () {
  before(function () {
    cy.visit(URL_FOR_TESTS);
  });

  it("Should open recursion page", function () {
    cy.visit(`${URL_FOR_TESTS}/recursion`);
    cy.contains("Строка");
  });
  it("Should open fibonacci page", function () {
    cy.visit(`${URL_FOR_TESTS}/fibonacci`);
    cy.contains("Последовательность Фибоначчи");
  });
  it("Should open sorting page", function () {
    cy.visit(`${URL_FOR_TESTS}/sorting`);
    cy.contains("Сортировка массива");
  });
  it("Should open stack page", function () {
    cy.visit(`${URL_FOR_TESTS}/stack`);
    cy.contains("Стек");
  });
  it("Should open queue page", function () {
    cy.visit(`${URL_FOR_TESTS}/queue`);
    cy.contains("Очередь");
  });
  it("Should open list page", function () {
    cy.visit(`${URL_FOR_TESTS}/list`);
    cy.contains("Связный список");
  });
});
