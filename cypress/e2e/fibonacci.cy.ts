
import { circleName } from "../../src/constants/test-constants";

describe("Fibonacci page health check", function () {
  beforeEach(() => {
    cy.visit(`/fibonacci`);
  });

  it("Checking if input is empty, then button should is not available", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("Should show correct values", () => {
    cy.get("input").type("5");
    cy.get("button").contains("Показать").click();
    cy.get(circleName).as("circle");

    cy.get("@circle").eq(0).should("contain", "1");
    cy.get("@circle").eq(1).should("contain", "1");
    cy.get("@circle").eq(2).should("contain", "2");
    cy.get("@circle").eq(3).should("contain", "3");
    cy.get("@circle").eq(4).should("contain", "5");
    cy.get("@circle").eq(5).should("contain", "8");
  });
});
