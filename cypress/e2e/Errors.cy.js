describe('App', () => {
    it("should tell the user to fill out all forms if inputs are empty", () => {
        cy.intercept(
            "GET",
            'http://localhost:3001/api/v1/urls',
            {fixture: "urls.json"}
          )
          cy.visit("http://localhost:3000/?title=&urlToShorten=")
        cy.get("button").click()
        cy.get("p").eq(0).contains("Please fill out the title and url fields")
      })

      it("should show user an error message on bat get request", () => {
        cy.intercept("http://localhost:3001/api/v1/urls", {
            statusCode: 400,
          });
        cy.visit("http://localhost:3000/?title=&urlToShorten=")

        cy.get("p").contains("We are sorry, but something went wrong. Error: 400 Bad Request")
      })

      it("should tell the user to fill out all forms if inputs are empty", () => {
        cy.intercept(
            "GET",
            'http://localhost:3001/api/v1/urls',
            {fixture: "urls.json"}
          )
          cy.visit("http://localhost:3000/?title=&urlToShorten=")
          cy.intercept(
              "POST",
              'http://localhost:3001/api/v1/urls',
              {
                  statusCode: 400,
              }
            )
            cy.get("input").eq(0).type("Test Url")
            cy.get("input").eq(1).type("https://test.gg")
            cy.get("button").click()

            cy.get("p").eq(0).contains("Sorry something went wrong and we were unable to send your url. Error: 400 Bad Request")
        })
})