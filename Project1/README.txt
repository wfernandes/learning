
Get Started:
 -	Open index.html in a browser.
 
Running Tests:
 -	Go into the tests directory
 -	Open SpecRunner.html in browser
 -	Tests are written in jasmine

Notes:
 - 	To enter a new record. Enter student name and score. 
	Press Enter or Click Add.
	Scores must be numerical and greater than 0.

 -	To edit an existing record, double click on the row. 
	Make change. 
	Press Enter to persist the change. 
	Press Esc to revert the change.
	Focusing out should persist the change if valid.

 -	Validation error msgs are displayed near the offending row or near the add btn when adding new records.

 -	Scores below 65 are highlighted in red.

 -	This app uses browser local storage in the form of Backbone.LocalStorage.
 
 -	Everything is tied to the collection. If the collection is modified then the views are re-rendered and stats 
	automatically updated.
 
Thoughts and Considerations:
 -	Probably best to use a module loader like require.js.
 -	Use template engine like jade.
	This would have made it more easier to write view related tests.
 -	Tested the app in Chrome.
 -	More tests around views are required.
 
References:
 -	Followed a similar design to TodoMVC in order to keep it simple but all code in this app is original.