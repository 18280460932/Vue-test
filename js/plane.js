Vue.component('pane',{
    name: 'pane',
    template:`
    <div class='pane' v-show='show'>
        <slot></slot>
    </div>`,
    props: {
        name: {
            type: String,
        },
        lable: {
            type: String,
            default:'',
        },
    },
    data () {
        return {
            show: true,
        }
    },
    methods: {
        updateNav () {
            this.$parent.updateNav();
        },
    },
    watch: {
        lable () {
            this.updateNav();
        },
    },
    mounted () {
        this.updateNav();
    },
});