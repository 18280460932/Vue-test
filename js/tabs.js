Vue.component('tabs',{
    template:`
    <div class='tabs'>
        <div class='tabs-bar'>
            <div :class='tabCls(item)' v-for='(item,index) in navList' @click='handleChange(index)'>
                {{item.lable}}
            </div>
        </div>
        <div class='tabs-content'>
            <slot></slot>
        </div>
    </div>`,
    data () {
        return {
            currentValue:this.value,
            //渲染tab的标题
            navList: [],
        }
    },
    props: {
        value: {
            type: [String,Number]
        },
    },
    methods: {
        tabCls: function(item) {
            return [
                'tabs-tab', {
                    'tabs-tab-active':item.name === this.currentValue,
                }
            ]
        },
        handleChange: function(index){
            let nav = this.navList[index];
            let name = nav.name;
            //改变当前选中的tab，并触发下面的watch
            this.currentValue = name;
            //触发一个自定义事件共父级使用
            this.$emit('input',name);
            this.$emit('on-click',name);
        },
        getTabs (){
            return this.$children.filter(function(item){
                console.log(item.$options);
                return item.$options.name === 'pane';
                
            });
        },
        updateNav () {
            this.navList=[];
            this.getTabs().forEach((pane,index) => {
                this.navList.push({
                    lable:pane.lable,
                    name:pane.name || index,
                });
                if(!pane.name){
                    pane.name = index; 
                }
                if(index === 0){
                    if(!this.currentValue){
                        this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus: function(){
            let tabs = this.getTabs();
            tabs.forEach(tab => {
                return tab.show =tab.name === this.currentValue;
            });
        },
    },
    watch: {
        value: function(val) {
            this.currentValue = val;
        },
        currentValue: function() {
            //在当前选中的tab发生变化时，更新pane的显示状态
            this.updateStatus();
        }
    },
});