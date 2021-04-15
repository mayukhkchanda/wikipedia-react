# **React-Wikipedia**

A simple react app that make a search to wikipedia api once user starts typing.

You can view the deployed project here https://mayukhkchanda.github.io/wikipedia-react/

I primarily used React hooks for this webapp.

- ### Components:

  - App.js: Renders the component in the root element.
  - SearchBar.js: Handles the user input and makes an api request to the Wikipedia api( https://en.wikipedia.org/w/api.php) whenever input changes . Used `setTimeout()` of to throttle the number of request made.

- ### Notable Points:
  1. Wikipedia API returns a block of embedded html in it's snippet. Used DOMPurify(https://github.com/cure53/DOMPurify) to `sanitize()` the response. Used `dangerouslySetInnerHTML()` to set the inner html of the paragraph.
  2. As React gives a warning message when variables used inside the `useEffect()` are not listed in the dependency array, used two different states to handle debouncing(or throttling) of the request. There is a commented out code of in `SearchBar.js` that shows the same.
  3. `useEffect()` can only return a function which gets invoked before every render after the initial render. Used this to `clearTimeout()` if the input changes within 500ms. This is essentially what throttles the request. If there is a pause of 500ms after the last input change, only then a request gets invoked.
