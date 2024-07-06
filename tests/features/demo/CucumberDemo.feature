@cucumber
Feature: Cucumber Demo

Background: Launch Google
Given Open Google page

Scenario: Scenario1 using RegExp
When search for wdio
And click for first search result link
* URL should match https://webdriver.io/

Scenario: Scenario2 using RegExp
When search for webdriverio
And click for first search result link
* URL should match https://webdriver.io/
