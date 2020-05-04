const vm_main = new Vue({
    el:"#main",
    data:{
        on:true,
        timer:0,
        updateTime:10000,
        speed:100,
        maxItensity:100,
        ligths:[
            {
                on:true,
                itensity:1
            },
            {
                on:false,
                itensity:0
            },
            {
                on:true,
                itensity:1
            },
            {
                on:false,
                itensity:0
            },
            {
                on:true,
                itensity:1
            },
            {
                on:false,
                itensity:0
            },
            {
                on:true,
                itensity:1
            }
        ],
        lightSelected:{
            line:0,
            light:0,
            r:0,
            g:0,
            b:0,
            size:0
        },
        setup:{
            lines:[],
            lights:7
        }
    },
    methods: {
        onOff()
        {
            this.on = !this.on
        },
        start()
        {
            this.addLine();
            this.selectLight(0,0);
        },
        addLine()
        {
            if(this.setup.lines.length < 7)
            {
                this.setup.lines.push({
                    lights:[]
                });
                for(let i = 0; i < this.setup.lights; i++)
                {
                    this.addColor();
                }
            }
        },
        removeLine()
        {
            if(this.setup.lines.length > 1)
            {
                if(this.lightSelected.line >= this.setup.lines.length - 2)
                {
                    this.selectLight(0,0);
                }

                this.setup.lines.splice(this.setup.lines.length - 1,1);
            }
        },
        addColor()
        {
            this.setup.lines.forEach(l => {
                l.lights.push({
                    r:Math.floor(Math.random() * 255),
                    g:Math.floor(Math.random() * 255),
                    b:Math.floor(Math.random() * 255),
                    size:50
                });
            });
        },
        selectLight(line,light)
        {
            this.lightSelected.line = line;
            this.lightSelected.light = light;
            this.lightSelected.r = this.setup.lines[line].lights[light].r;
            this.lightSelected.g = this.setup.lines[line].lights[light].g;
            this.lightSelected.b = this.setup.lines[line].lights[light].b;
            this.lightSelected.size = this.setup.lines[line].lights[light].size;
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
                    l.itensity=this.timer/(this.updateTime/this.speed)*(this.maxItensity/100);
                }
                else
                {
                    //l.itensity+=1/(this.updateTime/this.speed);
                    l.itensity=(1*(this.maxItensity/100))-this.timer/(this.updateTime/this.speed);
                }
            });
        },
        toogleLights()
        {
            this.ligths.forEach(l => {
                l.on  = !l.on;
            });
        },
        classColor(lights,i)
        {
            return `radial-gradient(circle, rgba(${lights[i].r}, ${lights[i].g}, ${lights[i].b},${this.ligths[i].itensity}) ${30*this.ligths[i].itensity}%,  rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)`;
        },
        changeColor(color)
        {
            let light = this.setup.lines[this.lightSelected.line].lights[this.lightSelected.light];
            this.lightSelected[color] = this.lightSelected[color].replace(" ","");
            this.lightSelected[color] = this.lightSelected[color].replace(/[^0-9]/g,"");
            this.lightSelected[color] = this.lightSelected[color] > 255 ? 255 : this.lightSelected[color];
            this.lightSelected[color] = this.lightSelected[color] < 0 ? 0 : this.lightSelected[color];

            light[color] = this.lightSelected[color];
        },
        changeSize()
        {
            let light = this.setup.lines[this.lightSelected.line].lights[this.lightSelected.light];
            this.lightSelected.size = this.lightSelected.size.replace(" ","");
            this.lightSelected.size = this.lightSelected.size.replace(/[^0-9]/g,"");

            light.size = this.lightSelected.size;
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
        speed(){
            this.speed = this.speed.replace(" ","");
            this.speed = this.speed.replace(/[^0-9]/g,"");
        },
        maxItensity(){
            this.maxItensity = this.maxItensity.toString().replace(" ","");
            this.maxItensity = this.maxItensity.toString().replace(/[^0-9]/g,"");
            this.maxItensity = this.maxItensity > 100 ? 100 : this.maxItensity;
        }
    },
    created() {
        this.updateFrame();
        this.start();
    },
});