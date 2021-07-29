function isValueNumber(val){
    return ((/^(0|[1-9][0-9]*)$/) || (/^((-\d+)|(0+))$/)).test(val+'');
};
Vue.component('input-number',{
    template:`
    <div> 
        <input type="text" :value="currentValue" @change='handleChange'/>
        <button type="button" @click="handleDown" :disable='currentValue <= min'>-</button>
        <button type="button" @click="handleUp" :disable='currentValue >= max'>+</button>
    </div>`,
    props: {
        max: {
            type:Number,
            default:Infinity,
        },
        min: {
            type: Number,
            default: -Infinity,
        },
        value: {
            type: Number,
            default: 0,
        },
        step:{
            type: Number,
            default:1,
        },

    },
    data() {
        return {
            currentValue:this.value,
        }
    },
    watch: {
        currentValue: function(val) {
            this.$emit('input',val);
            this.$emit('on-change',val);
        },
        value: function(val) {
            console.log(val+'...');
            this.updataValue(this.val);
        }
    },
    methods: {
        handleDown: function(){
            if(this.currentValue <= this.min ){
                return;
            }
            this.currentValue -= this.step;
            console.log(this.currentValue+'-')

        },
        handleUp: function(){
            if(this.currentValue >= this.max ){
                return;
            }
            this.currentValue += this.step;
            console.log(this.currentValue+'+')
        },
        updataValue: function(val){
            if(val <= this.min){
                val = this.min;
            }
            if(val >= this.max){
                val = this.max;
            }
            this.currentValue = val;
        },
        handleChange: function(e){
            console.log(e);
            let val=e.target.value.trim();//trim()去除首尾空格
            console.log(val);
            console.log("值改变了"+this.value);
            if(isValueNumber(val)){
                val = Number(val);
                this.currentValue = val ;
                if(val <= this.min){
                    this.currentValue = this.min;
                }
                if(val >= this.max){
                    this.currentValue = this.max;
                }
            }else{
                e.target.value = this.currentValue;
            }
        },
    },
    mounted: function() {
        this.updataValue(this.value);
    },
});