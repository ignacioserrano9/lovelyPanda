const Game = {

    title: 'Panda',
    author: 'Ignacio y Luciana',
    license: null,
    version: '1.0',
    canvasDom: undefined,
    ctx: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    pandaImg: document.getElementById("imgPanda"),

    backgroundImg: document.getElementById("imgBackground"),
    lianaImg: document.getElementById("imgLiana"),
    bees: [],
    frames: 0,
    beePosY: undefined,
    lilPanda: {},
    bigPanda: {},
    score : 0,    
    key: {
        up: 38,
        right: 37,
        left: 39,
        down: 40,
        space: 32,
        enter: 13
    },
    init(id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.start()

    },
    drawBackground() {
        this.ctx.drawImage(this.backgroundImg, 0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    setDimensions() {
        this.canvasSize.w = 1600 //window.innerWidth
        this.canvasSize.h = 900 //window.innerHeight
        this.canvasDom.setAttribute('width', this.canvasSize.w)
        this.canvasDom.setAttribute('height', this.canvasSize.h)
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    start() {
        this.lilPanda = new LilPanda(this.ctx, this.canvasSize, this.canvasSize.w - 200)
        this.bigPanda = new BigPanda(this.ctx, this.canvasSize)
        
        setInterval(() => {
            this.frames++
            this.clearScreen()
            this.drawBackground()
            this.frames % 100 === 0 ? this.randomY() : null
            this.delBee()
            this.drawLiana()
            this.bigPanda.armMoves()
            this.bigPanda.drawBigPanda()
            this.lilPanda.drawLilPanda()
            this.lilPanda.moveLilPanda()
            // this.moveLilPandaUp()
            this.frames % 100 === 0 ? this.bees.push(new Bee(this.ctx, this.beePosY, this.canvasSize)) : null
            this.bees.forEach(elm => {
                elm.drawBee()
                elm.moveBee()

            })
        }, 1000 / 60)

    },
    randomY() {
        if ((Math.floor(Math.random() * 3) - 1) === 0) {
            return this.beePosY = 350
        } else if ((Math.floor(Math.random() * 3) - 1) === 1) {
            return this.beePosY = 450
        } else {
            return this.beePosY = 600
        }
    },
    delBee() {
        this.bees = this.bees.filter(bee => bee.posX <= this.canvasSize.w - 800)
    },

    drawLiana() {
        this.ctx.drawImage(this.lianaImg, this.canvasSize.w - 225, 0, this.canvasSize.w / 14, this.canvasSize.h / 2)
    },
    
}
    //     killBees() {
            
    //         (300 <= this.this.bees.posy > 450 && this.bigPanda.pandaImg == leftUpPandaImg && 'onkeydown key Space (32)') ? score += 100 : null
    //         (300 <= this.this.bees.posy > 450 && this.bigPanda.pandaImg == leftUpPandaImg) ? 'Pierde una vida' : null
            
    //         (450 <= this.this.bees.posy > 600 && this.bigPanda.pandaImg == leftUpPandaImg && 'onkeydown key Space (32)') ? score += 100 : null
    //         (450 <= this.this.bees.posy > 600 && this.bigPanda.pandaImg == leftUpPandaImg) ? 'Pierde una vida' : null
            
    //         (600 <= this.this.bees.posy > 800 && this.bigPanda.pandaImg == leftUpPandaImg && 'onkeydown key Space (32)') ? score += 100 : null
    //         (600 <= this.this.bees.posy > 800 && this.bigPanda.pandaImg == leftUpPandaImg) ? 'Pierde una vida' : null
                
    // } 

    
