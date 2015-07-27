var testCase = buster.testCase("Iterator tests", {
	//the main set up, with a simple test array
	setUp: function(){
		this.inputArray = [1,2,3,4,5,6];
		this.iter = new Iterator(this.inputArray);
	},
	
    "hasNext should return true if there is a next": function () {
        buster.assert.isTrue(this.iter.hasNext());
    },
	
	"hasNext should return false if there is no next":{
		
		setUp: function(){
			this.inputArray = [1];
			this.iter = new Iterator(this.inputArray);
		},
		
		"success" : function(){
			buster.assert.isFalse(this.iter.hasNext());
		}
    },
	
	"next should return the next value": function () {
		//if we're starting at one, the next value is 2
		buster.assert.equals(2,this.iter.next());
	},
	
	"current should return the current value": function () {
		//and the current value is one
		buster.assert.equals(1,this.iter.current());
	},
	
	"tag works" : function () {
		//check that tag properly maintains itself even if the main iterator advances
		this.tag = this.iter.tag();
		this.iter.next();
		buster.assert.equals(1,this.tag());
	},
	
	"reverse should retain the same current value as before": function () {
		//if we start at one, then it should still be one
		this.iter.reverse();
		buster.assert.equals(1,this.iter.current());
	},

	"reverse should reverse the array": {
	
		"if the array is reversed from the starting point it will be at the end": function () {
			this.iter.reverse();
			//if we're at the end of the array as we should be, hasNext() will return false
			buster.assert.isFalse(this.iter.hasNext());
		},
		
		"if the array is reversed from the ending point it will be at the start": {
			setUp: function () {
				// a small array to avoid having to call next a bunch
				this.inputArray = [1,2];
				this.iter = new Iterator(this.inputArray);
			},
			
			"test": function () {
				this.iter.next();
				this.iter.reverse();
			   	buster.assert.equals(1, this.iter.next());
			}
		}
	}
});