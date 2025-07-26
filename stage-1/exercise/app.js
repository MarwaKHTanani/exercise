/*
 * Exercise: Refactor the code!
 *
 * This script file contains a small front-end app that queries the
 * StackOverflow API. It works, but the code is not ideal; there is a lot of
 * work to do to clean it up.
 *
 * First take a few minutes to understand what the code is doing, then use what
 * you have learned in the preceding stage-1 exercises to refactor the app.
 *
 * Take your time, and think about what principles you are trying to apply while
 * you are refactoring.
 */
"use strict";
const formUnanswerd = document.querySelector("#form-unanswered");
const resultSummary = document.querySelector("#results-summary");
const resultBody = document.querySelector("#results-body");

const req = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      callback(response);
    } else {
      console.log("Status Code: " + xhr.status);
    }
  });
  xhr.open("GET", url);
  xhr.send();
};

function createElement(tag) {
  const el = document.createElement(tag);
  return el;
}

formUnanswerd.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = e.target;
  let tags = form.querySelector("input[name=tags]").value;
  let url =
    "https://api.stackexchange.com/2.2/questions/unanswered?order=desc&sort=activity&site=stackoverflow&tagged=" +
    tags;

  req(url, (response) => {
    resultSummary.innerHTML = "";

    const p = createElement("p");
    p.textContent = `Query of ${tags} returned ${response.items.length} results`;
    resultSummary.appendChild(p);

    resultBody.innerHTML = "";
    response.items.map(function (item) {
      const container = createElement("div");

      const title = createElement("p");
      title.textContent = `Title: ${item.title}`;
      container.appendChild(title);

      const date = createElement("p");
      date.textContent = `Date: ${new Date(item.creation_date)}`;
      container.appendChild(date);

      const link = createElement("p");
      link.textContent = "Link: ";
      const a = createElement("a");
      a.href = item.link;
      a.textContent = "Click here";
      link.appendChild(a);
      container.appendChild(link);

      const owner = createElement("p");
      owner.textContent = `Owner: ${item.owner.display_name}`;
      container.appendChild(owner);

      resultBody.appendChild(container);
    });
  });
});

const formAnswerd = document.querySelector("#form-answerers");
formAnswerd.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = e.target;
  let tags = form.querySelector("input[name=tags]").value;
  let url =
    "http://api.stackexchange.com/2.2/tags/" +
    tags +
    "/top-answerers/all_time?site=stackoverflow";

  req(url, (response) => {
    resultSummary.innerHTML = "";

    const p = createElement("p");
    p.textContent = `Query of ${tags} returned ${response.items.length} results`;
    resultSummary.appendChild(p);

    resultBody.innerHTML = "";
    response.items.map(function (item) {
      const container = createElement("div");

      const user = createElement("p");
      user.textContent = `User: ${item.user.display_name}`;
      container.appendChild(user);

      const reputation = createElement("p");
      reputation.textContent = `Reputation: ${item.user.reputation}`;
      container.appendChild(reputation);

      const profile = createElement("p");
      profile.textContent = "Profile: ";
      const a = createElement("a");
      a.href = item.user.link;
      a.textContent = "Click here";
      profile.appendChild(a);
      container.appendChild(profile);

      const score = createElement("p");
      score.textContent = `Score: ${item.score}`;
      container.appendChild(score);

      resultBody.appendChild(container);
    });
  });
});
