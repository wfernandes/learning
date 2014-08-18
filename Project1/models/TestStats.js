var app = app || {}

app.TestStats = Backbone.Model.extend({

	defaults: {
		min: 0,
		max: 0,
		avg: 0,
		count:0
	}
	
});