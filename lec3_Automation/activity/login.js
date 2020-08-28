// npm install selenium-webdriver
// npm install chromedriver

//selenium functions => promises based => pending promise

require("chromedriver");
const swd = require("selenium-webdriver");

const { id, pw } = require("./credentials");
const { DriverService } = require("selenium-webdriver/remote");

let gCodes;
let gCode;
let gCustomBox;
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
    let bothFindPromise = Promise.all([idPromise, pwPromise]);
    return bothFindPromise;
  })
  .then(function (bothElements) {
    let idTypedPromise = bothElements[0].sendKeys(id);
    let pwTypedPromise = bothElements[1].sendKeys(pw);
    let bothTypedPromise = Promise.all([idTypedPromise, pwTypedPromise]);
    return bothTypedPromise;
  })
  .then(function () {
    let loginBtnClickedPromise = navigatorFunction(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button"
    );
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
    let allQuestionsPromise = driver.findElements(
      swd.By.css(".js-track-click.challenge-list-item")
    );
    return allQuestionsPromise;
  })
  .then(function (questionsArray) {
    let quesLink = [];
    for (let i = 0; i < questionsArray.length; i++) {
      let linkPromise = questionsArray[i].getAttribute("href");
      quesLink.push(linkPromise);
    }
    let allHrefsPromise = Promise.all(quesLink);
    return allHrefsPromise;
  })
  .then(function (allHrefs) {
    let promise = quesSubmitter(allHrefs[0]);
    return promise;
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

function handleLockBtn(selector){
    return new Promise(function(resolve , reject){
        let findLockPromise = driver.findElement(swd.By.css(selector));
        findLockPromise.then(function(element){
            let lockBtnClicked = element.click();
            return lockBtnClicked;
        }).then(function(){
            console.log("Lock Btn found !!");
            resolve();
        }).catch(function(){
            console.log("Lock Btn not found !!");
            resolve();
        })
    })
}

function getCode(){
    return new Promise(function(resolve , reject){
        let codeNamesP = driver.findElements(swd.By.css(".hackdown-content h3"));
        let codesP = driver.findElements(swd.By.css(".hackdown-content .highlight"));
        let codeObjectPromise = Promise.all(  [   codeNamesP , codesP   ] );
        codeObjectPromise.then(function(codeObject){
            let codesNames = codeObject[0];
            let codesActualNames = [];
            gCodes= codeObject[1];
            for(let i=0 ; i<codesNames.length ; i++){
                let nameP = codesNames[i].getText();
                codesActualNames.push(nameP);
            }
            let namesP = Promise.all(codesActualNames);
            return namesP;
        }).then(function(namesArr){
            let idx = namesArr.indexOf("C++");
            let codeP = gCodes[idx].getText();
            return codeP;
        }).then(function(code){
            gCode = code;
            resolve();
        })
        .catch(function(err){
            reject(err);
        })
    })
}

function quesSubmitter(link) {
  let promise = new Promise(function (resolve, reject) {
      let pageOpenPromise = driver.get(link);
      pageOpenPromise.then(function(){
          let clickedPromise = navigatorFunction("a[data-attr1='/challenges/sock-merchant/editorial']")
          return clickedPromise;
      })
      .then(function(){
          let handleLockBtnP = handleLockBtn(".ui-btn.ui-btn-normal.ui-btn-primary");
          return handleLockBtnP;
      })
      .then(function(){
          let getCodeP = getCode();
          return getCodeP;
      })
      .then(function(){
          let navigatedP = navigatorFunction('a[data-attr1="/challenges/sock-merchant/problem"]');
          return navigatedP;
      })
      .then(function(){
          let clickedPromise = navigatorFunction(".custom-input-checkbox");
          return clickedPromise;
      })
      .then(function(){
          let customInputP = driver.findElement(swd.By.css(".custominput"));
          return customInputP;
      })
      .then(function(element){
          gCustomBox = element;
          let codePastedP = element.sendKeys(gCode);
          return codePastedP;
      })
      .then(function(){
        let codeSelectedP = gCustomBox.sendKeys(swd.Key.CONTROL + 'a');
        return codeSelectedP;
      })
      .then(function(){
          console.log("Code is selected");
      })
      .catch(function(err){
          reject(err);
      })
  });
  return promise;
}


