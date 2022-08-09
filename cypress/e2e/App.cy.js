describe('App', () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      'http://localhost:3001/api/v1/urls',
      {fixture: "urls.json"}
    )
    cy.visit("http://localhost:3000/?title=&urlToShorten=")
  })

  it('should show a title and existing urls', () => {
    cy.get("h1").contains("URL Shortener")
    cy.get(".url").eq(0).within(() => {
      cy.get("h3").contains("Awesome photo")
      cy.get("a").contains("http://localhost:3001/useshorturl/1")
      cy.get("p").contains("https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")
    })

    cy.get(".url").eq(1).within(() => {
      cy.get("h3").contains("bunny")
      cy.get("a").contains("http://localhost:3001/useshorturl/2")
      cy.get("p").contains("https://media.newyorker.com/photos/59096937019dfc3494ea1169/master/pass/Frazier-Bunny-Rabbits.jpg")
    })

    cy.get(".url").eq(2).within(() => {
      cy.get("h3").contains("cuter bunny")
      cy.get("a").contains("http://localhost:3001/useshorturl/3")
      cy.get("p").contains("https://www.petakids.com/wp-content/uploads/2015/11/Cute-Red-Bunny.jpg")
    })
  })

  it("should show a form with default messages in it", () => {
    cy.get("input").eq(0).should("have.attr", "placeholder", "Title...")
    cy.get("input").eq(1).should("have.attr", "placeholder", "URL to Shorten...")
    cy.get("input").eq(0).should("have.value", "")
    cy.get("input").eq(1).should("have.value", "")
  })
  
  it("should allow a user to fill out the form", () => {
    cy.get("input").eq(0).type("Stuff")
    cy.get("input").eq(1).type("Things")
    cy.get("input").eq(0).should("have.value", "Stuff")
    cy.get("input").eq(1).should("have.value", "Things")
  })

  it("should allow a user to input into the form and get back an additional url", () => {
    cy.intercept(
      "POST",
      'http://localhost:3001/api/v1/urls',
      {
        "title": "Test Url",
        "long_url": "https://test.gg",
        "id": 4,
        "short_url": "http://localhost:3001/useshorturl/4"
      }
    )
    cy.intercept(
      "GET",
      'http://localhost:3001/api/v1/urls',
      {fixture: "urlsTwo.json"}
    )

    cy.get("input").eq(0).type("Test Url")
    cy.get("input").eq(1).type("https://test.gg")
    cy.get("button").click()

    cy.wait(500)
    cy.get(".url").eq(3).within(() => {
      cy.get("h3").contains("Test Url")
      cy.get("a").contains("http://localhost:3001/useshorturl/4")
      cy.get("p").contains("https://test.gg")
    })
  })
})