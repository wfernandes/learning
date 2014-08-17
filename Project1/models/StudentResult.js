var app = app || {}


app.StudentResult = Backbone.Model.extend({
	
	defaults: {
		name: '',
		score: 0
	},

	validate: function(attrs){
		console.log("validating model", attrs);
		
		if(_.isEmpty(attrs.name) || _.isEmpty(attrs.score)){
			return 'Student name and score cannot be empty'
		}else if(!this.isNumber(attrs.score)){
			return 'Student score must be a number'
		}
	},
	
	isNumber: function(value){
		return !isNaN(parseFloat(value));
	}
	
	
});
