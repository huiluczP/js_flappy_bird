/*
各种参数
*/

var main = (
    function(self){
        self.param = {
            //重力加速度，不过用到的只有1/2*g*t^2，看作t^2的权值就好
            G: 36,
            //初速度，跳跃用
            V: 20,
            //bird width
            BIRDWIDTH: 48,
            //bird height
            BIRDHEIGHT: 48,
            //bird y
            BIRDY: 130,
            //bird x
            BIRDX: 20,
            //帧率为1000/FREQUENCY
            FREQUENCY: 17,
            //背景图片高
            BACKGROUNDHEIGHT: 512,
            //地板高，摔地板死，免得鸟直接飞没了
            FLOOR: 10,
            //天花板高，免得鸟直接飞没了
            CEILING: 10,
            //管子移动速度
            PILLARV: 3,
            //管子数量
            PILLARNUM: 100,
            //SAFE ZONE
            SAFEZONE: 300,
            //管子宽度
            PILLARWIDTH: 52,
            //管子高度
            PILLARHEIGHT: 320,
            //管子间距
            PILLARCONTENT: 230,
            //通过口大小
            ENTER: 150,
            //管头长度(目测)
            HEADHEIGHT: 50,
            //管子开始的位置
            STARTPLACE: 600
        }
        return self
    }
)(main || {})