import { URL_FOR_TESTS } from "../../src/constants/test-constants";
import { DELAY_IN_MS } from "../../src/constants/delays";
import { colors } from "../../src/constants/test-constants";

describe("Queue page health check", function () {
  beforeEach(() => {
    cy.visit(`${URL_FOR_TESTS}/stack`);
  });

  it("Checking if input is empty, then button should is not available", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });
  
  it("Should add element in queue", function () {
    cy.get("input").type("5");
    cy.get("button").contains("Добавить").click();
    cy.get("[class^=circle_circle]").as("circle");

    cy.get("@circle")
      .eq(0)
      .should("contain", "5")
      .and("have.css", "border", colors.default);
  });

  it("Should delete element in queue", function () {
    cy.get("input").type("5");
    cy.get("button").contains("Добавить").click();
    cy.get("input").type("6");
    cy.get("button").contains("Добавить").click();
    cy.get("[class^=circle_circle]").as("circle");

    cy.get("@circle")
      .eq(0)
      .should("contain", "5")
      .and("have.css", "border", colors.default);

    cy.get("@circle")
      .eq(1)
      .should("contain", "6")
      .and("have.css", "border", colors.default);
    cy.wait(DELAY_IN_MS);
    cy.get("button").contains("Удалить").click();
    cy.wait(DELAY_IN_MS);
    cy.get("@circle")
      .eq(0)
      .should("contain", "5")
      .and("have.css", "border", colors.default);

    cy.get("@circle").eq(1).should("not.exist");
  });

  it("Should delete all elements from queue", () => {
    cy.get("input").type("5");
    cy.get("button").contains("Добавить").click();
    cy.get("input").type("6");
    cy.get("button").contains("Добавить").click();
    cy.wait(DELAY_IN_MS);
    cy.get("button").contains("Очистить").click();

    cy.get("[class^=circle_circle]").as("circle");
    cy.get("@circle").should("not.exist");
  });
});
