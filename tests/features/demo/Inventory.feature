Feature: Inventory

@Inventory
Scenario Outline: Demo Inventory

Given Login to Inventory app
When Inventory app should list <NumberOfProducts>
Then Validate all products have valid price

Examples:
|TestID|NumberOfProducts|
|INTV_TC001|6          |