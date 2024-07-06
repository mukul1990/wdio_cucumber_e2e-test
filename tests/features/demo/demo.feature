Feature: URL Validation

@smoke
Scenario Outline: Launch Google
Given Open Google page
When search for <searchItem>
And click for first search result link
Then Assert that URL is <expectedURL>

Examples:

|TestID|searchItem|expectedURL|
|DEMO_TC001|WDIO|https://webdriver.io|