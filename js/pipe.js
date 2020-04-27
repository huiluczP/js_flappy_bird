/*
水管主体
渲染所有柱子
柱子往左走
随机管道数值位置
*/

var main = (
    function(self){

        var param = self.param
        var $ = self.util.$

        self.pipe = {
            currentIndex: -1,
            init: function(){
                var t = this
                t.distance = 0 //指管子移动距离
                t.createPipes()
            },
            //将所有管子都整出来
            createPipes: function(){
                var t = this

                //全部塞到这个div中
                t.pipeBack = document.createElement("div")
                t.pipeBack.className = "pipe_back"
                t.pipeBack.id = "pipe_back"

                //当前管子位置
                t.place = param.STARTPLACE

                //所有管子
                for(var i = 0;i < param.PILLARNUM;i++){
                    var pipe = document.createElement("div")
                    pipe.className = "pipe"
                    pipe.id = "pipe" + i //用序号命名
                    var topPipe = document.createElement("div")
                    topPipe.className = "top"
                    var bottomPipe = document.createElement("div")
                    bottomPipe.className = "bottom"

                    //通过口固定，直接获取随机值为top的下边缘离top的位置
                    
                    var r = Math.random() * (param.BACKGROUNDHEIGHT - param.ENTER - param.HEADHEIGHT * 2) + param.HEADHEIGHT * 0.9
                    var sTop = r - param.PILLARHEIGHT
                    topPipe.style.top = sTop
                    var sBottom = param.BACKGROUNDHEIGHT - r - param.ENTER - param.PILLARHEIGHT
                    bottomPipe.style.bottom = sBottom

                    //设置属性，在bird通过时方便判断
                    pipe.setAttribute("top", param.BACKGROUNDHEIGHT - (param.PILLARHEIGHT + sTop))
                    pipe.setAttribute("bottom", param.BACKGROUNDHEIGHT - (param.PILLARHEIGHT + sTop) - param.ENTER)
                    
                    pipe.appendChild(topPipe)
                    pipe.appendChild(bottomPipe)
                    pipe.style.left = t.place

                    t.pipeBack.appendChild(pipe)
                    t.place += param.PILLARCONTENT
                }

                $("main screen").appendChild(t.pipeBack)               
            },
            //获取最近的管子的编号(可能不太准确，为了防止出错在判断时可对左右两根柱子都进行判断)
            findNearstPipe: function(){
                // 没考虑管子宽度感觉有点问题，等会修改
                var t = this
                var a = param.BIRDWIDTH + param.BIRDX
                var wholeDis = t.distance - (param.STARTPLACE - a)
                var index = wholeDis / param.PILLARCONTENT
                if(index < 0)
                    return -1
                else
                    return parseInt(index) + 1
            },
            //柱子移动
            move: function(){
                var t = this
                t.pipeBack.style.left = -t.distance
                t.currentIndex = t.findNearstPipe()
                console.log(t.currentIndex)
                t.distance += param.PILLARV
            }
        }
        return self
    }
)(main || {})