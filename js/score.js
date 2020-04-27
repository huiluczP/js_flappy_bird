/*
分数计算类
获取currentindex+1
修改左右图片
感觉手打没人过的了两位数直接两位数写死
*/

var main = (
    function(self){

        var $ = self.util.$
        var param = self.param
        var pipe = self.pipe
        console.log(typeof param)

        self.score = {
            scoreNum: 0,
            //直接从pipe中拿currentIndex就好，防止出错处理成两位数以下
            calScore: function(){
                var t = this
                if (pipe.currentIndex > 0)
                    t.scoreNum = pipe.currentIndex
                else
                    t.scoreNum = 0
                while(t.scoreNum >= 100){
                    t.scoreNum = t.scoreNum / 10
                }
                t.scoreNum = parseInt(t.scoreNum)
            },
            //修改显示
            changeScore: function(){
                var t = this
                t.calScore()
                if(t.scoreNum < 10){
                    var picNum = 48 + t.scoreNum
                    // var path = 'url(file:///E:/vscode/js%20code/flappy%20bird/img/font_0'+ picNum + '.png) no-repeat'
                    var path = 'url(./img/font_0'+ picNum + '.png) no-repeat'
                    $("right_score").style.background = path
                //两位数算两次
                }else{
                    var leftPlace = t.scoreNum / 10
                    leftPlace = parseInt(leftPlace)
                    var picNumLeft = 48 + leftPlace
                    var pathLeft = 'url(./img/font_0'+ picNumLeft + '.png) no-repeat'
                    $("left_score").style.background = pathLeft

                    var rightPlace = t.scoreNum - leftPlace * 10
                    rightPlace = parseInt(rightPlace)
                    var picNumRight = 48 + rightPlace
                    var pathRight = 'url(./img/font_0'+ picNumRight + '.png) no-repeat'
                    $("right_score").style.background = pathRight
                }
            }
        }
        return self
    }
)(main || {})