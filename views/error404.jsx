const React = require('react')
const Def = require('./default')

function error404 () {
    return (
      <Def>
          <main>
              <h1>404: PAGE NOT FOUND</h1>
              <p>Oops, sorry, we can't find this page!</p>
              <img src="/images/cat.jpg" alt="cat image" width="500" height="600"/>
              <div>
              Photo by <a href="https://unsplash.com/@peterlaster?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Pedro Lastra</a> on <a href="https://unsplash.com/photos/white-and-brown-city-buildings-during-daytime-Nyvq2juw4_o?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
              </div>
            </main>
        </Def>
    )
  }
  

module.exports = error404
