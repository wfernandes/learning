var app = app || {}

app.TestStats = Backbone.Model.extend({

	defaults: {
		minName: '',
		min: 0,
		maxName: '',
		max: 0,
		avg: 0
	}
	
});