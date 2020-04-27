/*
主程序
开始，结束，计算每帧操作
跳跃事件，死亡事件绑定
*/

var main = (
    function(self){
        var param = self.param
        var util = self.util
        var bird = self.bird
        var pipe = self.pipe
        var score = self.score
        var $ = self.util.$

        self.logic = {
            init: function(){
                var t = this
                //初始化，设置开始结束标示和帧计算timer
                t.isStrat = false
                t.isEnd = false
                t.timer = null

                bird.init(t.dead, t)
                pipe.init()
                t.addClickListener()
            },
            //鼠标左键跳跃
            addClickListener: function(){
                var t = this
                document.onclick = function(e){
                    e = e || event
                    if(!t.isEnd){
                        t.jump()
                    }else{
                        window.location.reload()
                    }    
                }
            },
            //跳跃函数，分最开始和普通跳跃
            jump: function(){
                var t = this
                if(!t.isStart){
                    $("logo").style.display='none'
                    $("start").style.display='none'
                    $("score").style.display = 'block'
                    t.isStart = true
                    t.timer = setInterval(
                        function(){
                            //计算跳跃，管道移动，碰撞判断，分数计算
                            bird.jump()
                            pipe.move()
                            score.changeScore()
                            bird.judge()
                        }, param.FREQUENCY
                    )                    
                //开始时重置bird位置  
                }else if(!t.isEnd){              
                    clearInterval(t.timer)
                    bird.atPosition()
                    t.timer = setInterval(
                        function(){
                            bird.jump()
                            pipe.move()
                            score.changeScore()
                            bird.judge()                                          
                        }, param.FREQUENCY
                    )
                }
            },
            //结束游戏，死亡时首先调用这个
            over: function(){
                var t = this
                clearInterval(t.timer)
                t.isEnd = true
                t.isStart = false
                $("end").style.display = 'block'
                // score居中
                $("score").style.top = '0'
                $("score").style.right = '0'
                $("score").style.left = '0'
                $("score").style.bottom = '0'
                $("score").style.margin = 'auto'
            },
            //dead
            dead: function(){
                var t = this
                t.over()
                bird.hit()
            }
        }
        main.init = function(){
            self.logic.init()
        }
        return self
    }
)(main || {})