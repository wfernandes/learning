var app = app || {}

StudentResultCollection = Backbone.Collection.extend({

	model: app.StudentResult,
	
	comparator: 'score',
	
	localStorage: new Backbone.LocalStorage('results-backbone')
	
});

app.StudentResultCollection = new StudentResultCollection();