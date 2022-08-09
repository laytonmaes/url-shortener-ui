export const getUrls = (urlBody) => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => {
        if(!response.ok) {
          throw new Error(response.status + " " + response.statusText)
        } else {
          response.json()
        }
      })
}

export const postUrl = () => {
  return fetch("/api/v1/urls",
  {
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify(urlBody)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error(response.status + " " + response.statusText)
    } else {
      response.json()
    }
  })
}