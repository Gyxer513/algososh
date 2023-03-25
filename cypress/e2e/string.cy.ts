import { URL_FOR_TESTS } from "../../src/constants/test-constants";
import { DELAY_IN_MS } from "../../src/constants/delays";
import { colors } from "../../src/constants/test-constants";

describe("Recursion page health check", function () {
  beforeEach(() => {
    cy.visit(`${URL_FOR_TESTS}/recursion`);
  });

  it("Checking if input is empty, then button should is not available", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("Should correrct reverse string", () => {
    cy.get("input").type("TEST");
    cy.get("button").contains("Развернуть").click();
    cy.get("[class^=circle_circle]").as("circle");

    cy.get("@circle")
      .eq(0)
      .should("contain", "T")
      .and("have.css", "border", colors.changing);
    cy.get("@circle")
      .eq(1)
      .should("contain", "E")
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(2)
      .should("contain", "S")
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(3)
      .should("contain", "T")
      .and("have.css", "border", colors.changing);

    cy.wait(DELAY_IN_MS);

    cy.get("@circle")
      .eq(0)
      .should("have.css", "border", colors.modified)
      .and("contain", "T");
    cy.get("@circle")
      .eq(1)
      .should("have.css", "border", colors.modified)
      .and("contain", "S");
    cy.get("@circle")
      .eq(2)
      .should("have.css", "border", colors.modified)
      .and("contain", "E");
    cy.get("@circle")
      .eq(3)
      .should("have.css", "border", colors.modified)
      .and("contain", "T");
  });
});
