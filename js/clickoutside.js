Vue.directive('clickoutside',{
    bind: function(el, binding, vnode){
        function documentHandler(e) {
            console.log(el.contains(e.target));
            console.log(e);
            if(el.contains(e.target)){
                return false;
            }
            if(binding.expression){
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click',documentHandler);
        console.log(el);

    },
    unbind: function(el, binding){
        document.removeEventListener('click',el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
});