Feature: Customer Search

@customer
Scenario Outline:<TestID>: search external customers

Given Get list of users from https://reqres.in/
When As an admin user login to nopcommerce site
#When Search users in customer list
Then Verify if all users exist in customer list

Examples:
|TestID|
|Cust_TC001|