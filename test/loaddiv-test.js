var testCase = buster.testCase("loadDiv tests", {
	"loadDiv should create an iterator with the right inputs": {
		setUp: function(){
			this.iter = loadDiv();
		},
		
		"an iterator should exist": function () {
			buster.assert.defined(this.iter);
		},
		
		//relies on us knowing the contents of the given HTML to make sure it's not mangling the input
		"current should equal string 1" : function () {
			buster.assert.equals('1', this.iter.current());
		},
		
		"next should equal string 2" : function () {
			buster.assert.equals('2',this.iter.next());
		}
	}
});