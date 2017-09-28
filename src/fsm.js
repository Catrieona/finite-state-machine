class FSM {
    
    constructor(config) {
      
      
      this.states = ['normal', 'busy', 'hungry', 'sleeping'];
      this.activeSt=config.initial
      this.initialSt=config.initial
      this.history=[]
      this.count=0

    }
      
    getState() {
    return this.activeSt
    }
    

       
    changeState(state) {
        for (var i=0; i<this.states.length; i++)
        {   if(this.states[i]==state){
            this.activeSt=state
            return this
            }
        }
            throw new Error();
    }

    
    trigger(event) {
       

        if (event=='study'&&this.activeSt=='normal')
            {this.activeSt='busy'; this.history.push(this.activeSt) }
        else if (event=='get_hungry'&&this.activeSt=='busy'||this.activeSt=='sleeping')
            {this.activeSt='hungry'; this.history.push(this.activeSt)}
        else if (event=='eat'&&this.activeSt=='hungry')
            {this.activeSt='normal'; this.history.push(this.activeSt)}
        else if (event=='get_tired'&&this.activeSt=='busy')
            {this.activeSt='sleeping'; this.history.push(this.activeSt)}
        else if (event=='get_up'&&this.activeSt=='sleeping')
            {this.activeSt='normal'; this.history.push(this.activeSt)}
        else
        {throw new Error('Error')}
        this.count++;

    }

    
    reset() {

        this.activeSt=this.initialSt

    }

    
    getStates(event) {
    var arr=[]

    if  (!event){
        return this.states
    }

    
    if (event=='study'){
        return arr.push('normal')
    }
    if (event=='get_tired'){
        return arr.push('busy')
    }
    if (event=='get_up'){
        return arr.push('sleeping')
    }
    if (event=='get_hungry'){
        return arr.push('busy', 'sleeping')
    }
    if (event=='eat'){
        return arr.push('hungry')
    }
        
        else
        {return arr} 



    }

    
    undo() {
        if(this.history[this.count-1]==undefined || this.count <=0)
        {
            this.activeSt = this.initialSt;
            return false;
        }

        this.activeSt = this.history[this.count-1];
        this.count--;
        return true;
    }

    redo() {}

    
    clearHistory() {
    this.history=[]
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
