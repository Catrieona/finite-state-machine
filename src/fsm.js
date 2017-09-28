class FSM {
    
    constructor(config) {
      
      this.states = ['normal', 'busy', 'hungry', 'sleeping'];
      this.activeSt=config.initial
      this.initialSt=config.initial
      this.history=[this.activeSt]
      this.count=0
      this.changeStateUsed = false;

    }
      
    getState() {
    	return this.activeSt;
    	this.changeStateUsed = false;
    }
    

       
    changeState(state) {
        for (var i=0; i<this.states.length; i++){
        	if(this.states[i]==state){
	            this.activeSt=state;
	            if(this.history[this.history.length-1] != state){
	            	this.history.push(this.activeSt);
	            }
	            this.count++;
	            this.changeStateUsed = true;
	            return this;
            }
        }
            throw new Error();
    }

    
    trigger(event) {
       

        if (event == 'study' && this.activeSt == 'normal'){
        	this.changeState('busy')
        } else if ((event == 'get_hungry' && this.activeSt == 'busy')||
        	(event == 'get_hungry' && this.activeSt == 'sleeping')){            
        	this.changeState('hungry')
        } else if (event == 'eat' && this.activeSt == 'hungry'){
            this.changeState('normal')
         } else if (event == 'get_tired' && this.activeSt == 'busy'){
            this.changeState('sleeping')
        } else if (event=='get_up'&&this.activeSt=='sleeping'){
            this.changeState('normal')
         } else {
         	throw new Error('Error');
         }
         this.changeStateUsed = false;
        

    }

    
    reset() {

        this.activeSt = this.initialSt;
        this.history = [].push(this.activeSt);
        this.count = 0;
        this.changeStateUsed = false;
    }

    
    getStates(event) {
	    var arr=[];

	    if  (!event){
	    	this.changeStateUsed = false;
	        return this.states;
	    }

	    
	    if (event=='study'){
	        arr.push('normal');
	    } else if (event=='get_tired'){
	        arr.push('busy');
	    } else if (event=='get_up'){
	        arr.push('sleeping');
	    } else if (event=='get_hungry'){
	        arr.push('busy','sleeping');
	    } else if (event=='eat'){
	        arr.push('hungry');
	    } 

		this.changeStateUsed = false;
	    return arr;


    }

    
    undo() {
        if(this.history[this.count-1]==undefined || this.count <=0){
            return false;
        }
        this.activeSt = this.history[this.count-1]
        this.count--;
        this.changeStateUsed = false;
        return true;
    }

    redo() {
		if(!this.history[this.count+1] || this.changeStateUsed == true){
            return false;
        }

        this.activeSt = this.history[this.count+1]
        this.count++;
        this.changeStateUsed = false;
        return true;
        

    }

    
    clearHistory() {
    	this.history=[]
    	this.count = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
