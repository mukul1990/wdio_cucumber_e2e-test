Feature: URL Validation

#@demo
Scenario: Launch Google
Given Open Google
When search for wdio
And click for first search result link
Then Assert that URL is https://webdriver.io