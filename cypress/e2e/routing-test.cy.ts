
describe("app works correctly with routes", function () {
  before(function () {
    cy.visit('/');
  });
  it("Should open recursion page", function () {
    cy.visit(`/recursion`);
    cy.contains("Строка");
  });
  it("Should open fibonacci page", function () {
    cy.visit(`/fibonacci`);
    cy.contains("Последовательность Фибоначчи");
  });
  it("Should open sorting page", function () {
    cy.visit(`/sorting`);
    cy.contains("Сортировка массива");
  });
  it("Should open stack page", function () {
    cy.visit(`/stack`);
    cy.contains("Стек");
  });
  it("Should open queue page", function () {
    cy.visit(`/queue`);
    cy.contains("Очередь");
  });
  it("Should open list page", function () {
    cy.visit(`/list`);
    cy.contains("Связный список");
  });
});
