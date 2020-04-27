var main = (
    function(self){
        self.util = {
            // 仿JQuery$函数
            $: function(id){
                return document.getElementById(id)
            },
            //获取子元素
            getChildElement: function(ele){
                var childs = ele.childNodes || ele.children
                var childArray = []
                for (var i =0;i < childs.length;i++){
                    if(childs[i].nodeType == 1) //元素
                        childArray.push(childs[i])
                }
                return childArray
            }
        }
        return self
    }
)(main || {})