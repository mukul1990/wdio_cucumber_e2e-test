Feature: Inventory

@Inventory
Scenario Outline:<TestID>: Demo Inventory

Given As a standard user Login to Inventory web app
|userType|username|
|standard|standard_user|
|problem|problem_user|
|performance|performance_glitch_user|
|visual|visual_user|
When Inventory app should list <NumberOfProducts>
Then Validate all products have valid price

Examples:
|TestID|NumberOfProducts|
|INTV_TC001|6          |