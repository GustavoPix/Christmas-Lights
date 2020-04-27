const vm_main = new Vue({
    el:"#main",
    data:{
        on:true,
        timer:0,
        updateTime:10000,
        speed:10,
        ligths:[
            {
                r:215,
                g:54,
                b:36,
                on:true,
                itensity:1
            },
            {
                r:238,
                g:99,
                b:42,
                on:false,
                itensity:0
            },
            {
                r:244,
                g:217,
                b:66,
                on:true,
                itensity:1
            },
            {
                r:23,
                g:119,
                b:73,
                on:false,
                itensity:0
            },
            {
                r:33,
                g:125,
                b:212,
                on:true,
                itensity:1
            },
            {
                r:38,
                g:60,
                b:159,
                on:false,
                itensity:0
            },
            {
                r:110,
                g:27,
                b:95,
                on:true,
                itensity:1
            }
        ],
        setup:{
            lines:1,
            lights:7
        }
    },
    methods: {
        onOff()
        {
            this.on = !this.on
        },
        async updateFrame()
        {
            //this.debug();
            if(this.on)
            {
                this.updateLights();
                this.timer++;
                if(this.timer >= this.updateTime/this.speed)
                {
                    this.timer = 0;
                    this.toogleLights();
                }
            }
            setTimeout(function(){
                vm_main.updateFrame();
            },10);
        },
        updateLights()
        {
            this.ligths.forEach(l => {
                if(l.on)
                {
                    //l.itensity-=1/this.updateTime;
                    l.itensity=this.timer/(this.updateTime/this.speed);
                }
                else
                {
                    //l.itensity+=1/(this.updateTime/this.speed);
                    l.itensity=1-this.timer/(this.updateTime/this.speed);
                }
            });
        },
        toogleLights()
        {
            this.ligths.forEach(l => {
                l.on  = !l.on;
            });
        },
        classColor(i)
        {
            return `radial-gradient(circle, rgba(${this.ligths[i].r}, ${this.ligths[i].g}, ${this.ligths[i].b},${this.ligths[i].itensity}) ${30*this.ligths[i].itensity}%,  rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)`;
        },
        debug()
        {
            console.log(`Light itensity: ${this.ligths[0].itensity}`);
            console.log(`Light on: ${this.ligths[0].on}`);
            console.log(`Timer: ${this.timer}`);
            console.log("-----------------------------------------------");
        }
    },
    watch: {
        
    },
    created() {
        this.updateFrame();
    },
});