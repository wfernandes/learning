var app = app || {}


app.StudentResult = Backbone.Model.extend({
	
	defaults: {
		name: '',
		score: 0
	},

	validate: function(attrs){		
		if(_.isEmpty(attrs.name) || _.isEmpty(attrs.score)){
			return 'Student name and score cannot be empty';
		}else if(!this.isNumber(attrs.score)){
			return 'Student score must be a number';
		}else if(parseFloat(attrs.score) < 0){
			return 'Student score must not be negative';
		}
	},
	
	isNumber: function(value){
		return !isNaN(parseFloat(value));
	}
	
	
});
