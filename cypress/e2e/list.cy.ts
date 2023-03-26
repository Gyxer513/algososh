import { colors } from "../../src/constants/test-constants";
import { defaultArray } from "../../src/components/list-page/utils";
import { circleName } from "../../src/constants/test-constants";

describe("Queue page health check", function () {
  beforeEach(() => {
    cy.visit(`/list`);
  });

  it("Checking if input is empty, then buttons should is not available", function () {
    cy.get("input").should("be.empty");
    cy.get('[data-cy="button-add-head"]').should("be.disabled");
    cy.get('[data-cy="button-add-tail"]').should("be.disabled");
    cy.get('[data-cy="button-add-by-index"]').should("be.disabled");
    cy.get('[data-cy="button-delete-by-index"]').should("be.disabled");
  });

  it("Checking correct render start array", function () {
    cy.get(circleName).as("circle");

    cy.get("@circle")
      .eq(0)
      .should("contain", `${defaultArray[0]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(1)
      .should("contain", `${defaultArray[1]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(2)
      .should("contain", `${defaultArray[2]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(3)
      .should("contain", `${defaultArray[3]}`)
      .and("have.css", "border", colors.default);
  });

  it("Should add element in head", function () {
    cy.get('[data-cy="value-input"]').type("5");
    cy.get("button").contains("Добавить в head").click();
    cy.get(circleName).as("circle");

    cy.get("@circle")
      .eq(0)
      .should("contain", "5")
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(1)
      .should("contain", `${defaultArray[0]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(2)
      .should("contain", `${defaultArray[1]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(3)
      .should("contain", `${defaultArray[2]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(4)
      .should("contain", `${defaultArray[3]}`)
      .and("have.css", "border", colors.default);
  });

  it("Should add element in tail", function () {
    cy.get('[data-cy="value-input"]').type("5");
    cy.get("button").contains("Добавить в tail").click();
    cy.get(circleName).as("circle");

    cy.get("@circle")
      .eq(0)
      .should("contain", `${defaultArray[0]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(1)
      .should("contain", `${defaultArray[1]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(2)
      .should("contain", `${defaultArray[2]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(3)
      .should("contain", `${defaultArray[3]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(4)
      .should("contain", "5")
      .and("have.css", "border", colors.default);
  });

  it("Should add element by index", function () {
    cy.get('[data-cy="value-input"]').type("5");
    cy.get('[data-cy="index-input"]').type("1");
    cy.get("button").contains("Добавить по индексу").click();

    cy.get(circleName).as("circle");

    cy.get("@circle")
      .eq(0)
      .should("contain", `${defaultArray[0]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(1)
      .should("contain", "5")
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(2)
      .should("contain", `${defaultArray[1]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(3)
      .should("contain", `${defaultArray[2]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(4)
      .should("contain", `${defaultArray[3]}`)
      .and("have.css", "border", colors.default);
  });

  it("Should delete element in head", function () {
    cy.get("button").contains("Удалить из head").click();
    cy.get(circleName).as("circle");

    cy.get("@circle")
      .eq(0)
      .should("contain", `${defaultArray[1]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(1)
      .should("contain", `${defaultArray[2]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(2)
      .should("contain", `${defaultArray[3]}`)
      .and("have.css", "border", colors.default);
  });

  it("Should вудуеу element in tail", function () {
    cy.get("button").contains("Удалить из tail").click();
    cy.get(circleName).as("circle");

    cy.get("@circle")
      .eq(0)
      .should("contain", `${defaultArray[0]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(1)
      .should("contain", `${defaultArray[1]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(2)
      .should("contain", `${defaultArray[2]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle").eq(3).should("not.exist");
  });

  it("Should add element by index", function () {
    cy.get('[data-cy="index-input"]').type("1");
    cy.get("button").contains("Удалить по индексу").click();

    cy.get(circleName).as("circle");

    cy.get("@circle")
      .eq(0)
      .should("contain", `${defaultArray[0]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(1)
      .should("contain", `${defaultArray[2]}`)
      .and("have.css", "border", colors.default);
    cy.get("@circle")
      .eq(2)
      .should("contain", `${defaultArray[3]}`)
      .and("have.css", "border", colors.default);
  });
});
