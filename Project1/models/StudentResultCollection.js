var app = app || {}

StudentResultCollection = Backbone.Collection.extend({

	model: app.StudentResult,
	
	comparator: 'score',
	
	// Using Backbone.LocalStorage as persistence
	localStorage: new Backbone.LocalStorage('results-backbone')
	
});

app.StudentResultCollection = new StudentResultCollection();