describe("Student Result Collection" , function(){

	var studentResult;
	
	beforeEach(function(){
	
        // This should go in an overall before function but surprisingly jasmine doesn't seem to have 
        // a before function only before each.
        if(app.StudentResultCollection.localStorage 
            && app.StudentResultCollection.localStorage.name == "results-backbone"){
            // Want to use a different local storage for tests
            app.StudentResultCollection.localStorage = new Backbone.LocalStorage('test-backbone');        
        }
        
	});

	it("should validate name and score existence", function(){
		 
        var res = app.StudentResultCollection.create({name: '', score: ''}, {wait: true});        
        expect(res.validationError).toEqual('Student name and score cannot be empty');          
	});
    
	it("should validate score existence", function(){
		
        var res = app.StudentResultCollection.create({name:"Kevin Spacey"}, {wait: true});        
        expect(res.validationError).toEqual('Student name and score cannot be empty');        
	});
    
	it("should validate name existence", function(){
		       
        var res = app.StudentResultCollection.create({score:"onehundred"}, {wait: true});        
        expect(res.validationError).toEqual('Student name and score cannot be empty');        
	});
    
    it("should validate that score is a number", function(){
    
        var res = app.StudentResultCollection.create({name: "Denzel Washington", score:"onehundred"}, {wait: true});
        expect(res.validationError).toEqual('Student score must be a number');
        
        res = app.StudentResultCollection.create({name: "Zoe Saldana", score:"99.9"});
        expect(res.validationError).toEqual(null);
        expect(res.get('name')).toEqual('Zoe Saldana');
        expect(res.get('score')).toEqual('99.9');
    });
    
     it("should validate that score cannot be negative", function(){
        var res = app.StudentResultCollection.create({name: "Pearl Jam", score:"-99"}, {wait: true});
        expect(res.validationError).toEqual('Student score must not be negative');
        
    });

});