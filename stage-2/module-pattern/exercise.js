/*
 * Exercise: Create some modules!
 *
 * When you think you have finished, run the command:
 *   npm run s2.modules
 * This will run a series of tests which should all pass.
 */
"use strict";
/*
 * Create a single module (using an IIFE) which contains functionality to parse
 * URLs.
 *
 * We have started you off with the basic structure.
 *
 *     https    ://   www.example.com  /   hello  ?  foo=1&bar=2
 * |          |     |                |   |      |  |             |
 * | protocol |     |    domain      |   | path |  | querystring |
 */
let UrlParser = (function () {
  let protocol = function (url) {
    let parsed = new URL(url);
    return parsed.protocol.replace(":", "");
  };
  let domain = function (url) {
    return new URL(url).hostname;
  };
  let path = function (url) {
    let path = new URL(url).pathname;
    if (path.startsWith("/")) {
      path = path.slice(1);
    }
    if (path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    return path;
  };
  let querystring = function (url) {
    let search = new URL(url).search;
    return search.startsWith("?") ? search.slice(1) : search;
  };
  return {
    protocol: protocol,
    domain: domain,
    path: path,
    querystring: querystring,
  };
})();

/*
 * Create a module that can support multiple instances (like in our example).
 * The module should be a function with several additional methods attached as
 * attributes.
 *
 * Example:
 * var exampleBuilder = createUrlBuilder('https://example.com');
 *
 * var url = exampleBuilder({ query: { foo: 1, bar: 2 }, path: 'hello' });
 *
 * console.log(url); // https://example.com/hello?foo=1&bar=2
 *
 * exampleBuilder.
 */
let createUrlBuilder = function (host) {
  let builder = function (option = {}) {
    const url = new URL(host);

    if (option.path) {
      let path = option.path;
      if (path.startsWith("/")) path = path.slice(1);
      url.pathname = path;
    }

    if (option.query) {
      Object.entries(option.query).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url.toString();
  };

  builder.path = function (path) {
    const url = new URL(host);
    if (path.startsWith("/")) path = path.slice(1);
    url.pathname = path;
    return url.toString();
  };

  builder.query = function (query) {
    const url = new URL(host);
    url.pathname = "";

    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    return url.toString();
  };

  return builder;
};

module.exports = {
  UrlParser,
  createUrlBuilder,
};
