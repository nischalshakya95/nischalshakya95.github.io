class Stack {

    constructor() {
        this.items = [];
    }

    push(element){
        this.items.push(element)
    }

    pop(){
        if (this.items.length === 0) {
            return 'underflow';
        }
        return this.items.pop();
    }
}
