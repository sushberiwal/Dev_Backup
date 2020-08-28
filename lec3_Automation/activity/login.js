// npm install selenium-webdriver
// npm install chromedriver

//selenium functions => promises based => pending promise

require("chromedriver");
const swd = require("selenium-webdriver");

const { id, pw } = require("./credentials");

//build an instance of browser
let bldr = new swd.Builder();
//open a tab
let driver = bldr.forBrowser("chrome").build();

// promises chaining ?
let pageWillBeOpenedPromise = driver.get(
  "https://www.hackerrank.com/auth/login"
);
pageWillBeOpenedPromise
  .then(function () {
    let waitPromise = driver.manage().setTimeouts({ implicit: 5000 });
    return waitPromise;
  })
  .then(function () {
    let idPromise = driver.findElement(swd.By.css("#input-1"));
    let pwPromise = driver.findElement(swd.By.css("#input-2"));
    let bothFindPromise = Promise.all( [idPromise , pwPromise] );
    return bothFindPromise;
  })
  .then(function (bothElements) {
    let idTypedPromise = bothElements[0].sendKeys(id);
    let pwTypedPromise = bothElements[1].sendKeys(pw);
    let bothTypedPromise = Promise.all( [ idTypedPromise , pwTypedPromise ]);
    return bothTypedPromise;
  })
  .then(function () {
    let loginBtnClickedPromise = navigatorFunction(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
    return loginBtnClickedPromise;
  })
  .then(function () {
    let ipKitClickedP = navigatorFunction("#base-card-1-link");
    return ipKitClickedP;
  })
  .then(function () {
    let warmUpPageP = navigatorFunction('a[data-attr1="warmup"]');
    return warmUpPageP;
  })
  .then(function () {
    console.log("Reached warmup challenges");
  })
  .catch(function (error) {
    console.log(error);
  });

function navigatorFunction(selector) {
    console.log("inside navigator function !!");
  let promise = new Promise(function (resolve, reject) {
    let elementPromise = driver.findElement(swd.By.css(selector));
    elementPromise
      .then(function (element) {
        let elementClickedP = element.click();
        return elementClickedP;
      })
      .then(function () {
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
  return promise;
}
