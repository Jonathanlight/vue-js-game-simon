Vue.config.productionTip = false;
Vue.config.devtools = true;

const vm = new Vue({
    el: "#app",
    data: {
        topLeft: false,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
        sequence: [],
        tmp: [],
        squareMapping: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']
    },
    methods: {
        addNewElementSequence(){
            this.sequence.push( this.squareMapping[Math.floor(Math.random() * 4)] );
            this.tmp = this.sequence.slice();
        },
        resetSquare(){
            this.topLeft = false;
            this.topRight = false;
            this.bottomLeft = false;
            this.bottomRight = false;
        },
        selectSquare(instruction){
            if(this.tmp[0] == instruction) {
                this[instruction] = true;

                setTimeout(function(){
                    vm.resetSquare();
                    vm.tmp.shift();
                    if(!vm.tmp[0]){
                        vm.nextTurn();
                    }
                }, 400);
            }else{
                alert('Echec');
            }
        },
        playSequence(instruction){
            this[instruction] = true;

            setTimeout(function(){
                vm.resetSquare();
                vm.tmp.shift();
                if(vm.tmp[0]){

                    setTimeout(function(){
                        vm.playSequence(vm.tmp[0]);
                    }, 500);
                    
                }else{
                    vm.tmp = vm.sequence.slice();
                }
            }, 400);
        },
        nextTurn(){
            this.addNewElementSequence();
            this.resetSquare();
            this.playSequence(this.tmp[0]);
        },
        newGame(){
            this.sequence = [];
            this.nextTurn();
        }
    },
    computed: {
        score(){
            const value = this.sequence.length - 1;

            return value < 0 ? `Score : 0` : `Score : ${value}`;
        }
    },
});

console.log(vm);