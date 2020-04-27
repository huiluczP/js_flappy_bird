/*
鸟主体
每帧的跳跃计算
碰管死亡
坠地死亡
位置判断
*/

var main = (
    function(self){

        var $ = self.util.$
        var param = self.param
        var pipe = self.pipe
        console.log(typeof param)

        self.bird = {
            Y: 0,
            hitOn: 0,
            init: function(actionListenerMethod, actionListener){
                var t = this
                t.time = 0 //经过时间
                t.reachOver = false //上一帧是否超过天花板
                $('bird').style.left = param.BIRDX + "px" //鸟的横轴位置，始终不变
                t.actionListener = actionListener //当不同情况死亡时调用监听器方法
                t.actionListenerMethod = actionListenerMethod
            },
            //鸟就位
            atPosition: function(){
                var t = this
                //鸟位置重置
                $('bird').style.bottom = t.Y
                param.BIRDY = t.Y
                t.time = 0
            },
            //跳跃,一帧计算(关键)
            jump: function(){
                var t = this
                var frame = param.FREQUENCY / 1000 //秒数
                //计算当前帧位置距离
                if(!t.reachOver){
                    var dis = param.V * t.time - param.G * t.time * t.time
                    t.Y = param.BIRDY + dis
                }else{
                    t.Y = param.BACKGROUNDHEIGHT - param.CEILING - param.BIRDHEIGHT - 5
                }
                //当鸟位于空中，天花板和地板之间
                if (t.Y >= param.FLOOR && t.Y <= param.BACKGROUNDHEIGHT - param.CEILING - param.BIRDHEIGHT){
                    //console.log(1)
                    $("bird").style.bottom = t.Y
                    param.BIRDY = t.Y
                    t.reachOver = false
                //鸟卡在天花板
                }else if(t.Y > param.BACKGROUNDHEIGHT - param.CEILING - param.BIRDHEIGHT){
                    //console.log(2)
                    var pos = param.CEILING
                    $("bird").style.top = pos + "px" + 5
                    param.BIRDY =  param.BACKGROUNDHEIGHT - param.CEILING - param.BIRDHEIGHT -5
                    t.reachOver = true
                    // 此时time为位移量为0时
                    t.time = param.V / param.G                      
                //撞上地板
                }else{
                    console.log("hit ground")
                    t.dead()
                }
                t.time += frame
            },
            //死亡时调用监听器方法
            dead: function(){
                //转换this对象
                this.actionListenerMethod.call(this.actionListener)
            },
            //撞击柱子时摔落
            hit: function(){
                var t = this
                var timer = setInterval(
                    function() {
                        $("bird").style.bottom = t.Y
                        // 免得摔出边界
                        if (t.Y <= param.FLOOR) {
                            clearInterval(timer);
                        }
                        t.Y -= 12;//每帧下降,做出坠落效果
                    },param.FREQUENCY
                )
            },
            //判断撞击
            judge: function(){
                //获取pipe中的currentIndex来判断，当前柱子应该为currentIndex+1
                //感觉为了能正确可以都算
                var t = this
                if (pipe.currentIndex > 0)
                    var index = pipe.currentIndex - 1
                else
                    var index = 0
                var afterIndex = index + 1
                var currentP = $("pipe" + index)
                //var currentP1 = $("pipe" + afterIndex)
                //if(!t.judgePipe(currentP) || !t.judgePipe(currentP1))
                t.judgePipe(currentP)
                if(t.hitOn != 0){
                    t.dead()
                }
            },
            //对管计算
            judgePipe: function(currentPipe){
                var t = this
                                //通过属性获取上管和下管，此时为相对screen坐标
                var pipeTop = currentPipe.getAttribute("top")
                var pipeBottom = currentPipe.getAttribute("bottom")
                var pipeLeft = parseInt(currentPipe.style.left) + parseInt($("pipe_back").style.left)
                var pipeRight = parseInt(pipeLeft) + parseInt(param.PILLARWIDTH)
                
                var birdLeft = param.BIRDX
                var birdRight = param.BIRDX + param.BIRDWIDTH
                var birdTop = parseInt($("bird").style.bottom) + param.BIRDHEIGHT
                var birdBottom = parseInt($("bird").style.bottom)

                console.log(pipeTop+" "+ pipeBottom+ " "+birdTop +" "+ birdBottom+ " | "+
                pipeLeft + " "+ pipeRight + " "+ birdLeft+ " "+ birdRight)

                //进入管内
                if(birdLeft > pipeLeft && birdRight < pipeRight){
                    if(pipeTop < birdTop || pipeBottom > birdBottom){
                        console.log("hit")
                        // 撞击死亡
                        t.hitOn = 1
                        return
                    }
                }

                t.hitOn = 0
            }
        }

        return self
    }
)(main || {})