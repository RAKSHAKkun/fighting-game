const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 570

c.fillRect(0, 0, canvas.width, canvas.height)

 
const gravity = 1

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc:'img/charai.png',
    
})


const shop= new Sprite({
    position:{
        x:50,
        y:235
    },
    imageSrc:'img/shop.png',
    scale:2,
    framesMax:6,
    framesHold:5
    
})

const Arc = new Sprite({
    position:{
        x:600,
        y:165
    },
    imageSrc:'img/arc.png',
    scale:1.5
})

const player = new Fighter({
    
    position: {
        x: 10,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    color:'red',
    offset:{
        x:0,
        y:0
    },
    imageSrc:'goku/SKstance.png',
    framesMax:6,
    scale:1.8,
    offset:{
        x:0,
        y:60
    },
    sprites:{
        kick:{
            imageSrc:'goku/kicknew.png',
            framesMax:7,
        },
        stance:{
            imageSrc:'goku/SKstance.png',
            framesMax:6,
        },
        jump:{
            imageSrc:'goku/jumpie.png',
            framesMax:2
        },
        death:{
            imageSrc:'goku/fune.png',
            framesMax:3
        },
        run:{
            imageSrc:'goku/run.png',
            framesMax:2
        },
        punch:{
            imageSrc:'goku/punch.png',
            framesMax:6
        },
        takeHit:{
            imageSrc:'goku/realHittt.png',
            framesMax:4
        },
        fall:{
            
            imageSrc:'goku/jump.png',
            framesMax:2
        },attack2:{
            imageSrc:'goku/hammer.png',
            framesMax:6
        }
    },
    attackBox:{
        offset:{
            x:100,
            y:50
        },
        width:200,
        height:100
    }
    
})


const enemy = new Fighter({
    
    position: {
        x: 500,
        y: 90
    },
    velocity: {
        x: 0,
        y: 0
    },
    color:'blue',
    offset:{
        x:-100,
        y:50
    },
    imageSrc:'meow/peakst.png',
    framesMax:5,
    scale:1.7,
    offset: {
        x: 0,
        y: 40,
      },
    sprites:{
        kick:{
            imageSrc:'meow/tailatck.png',
            framesMax:6,
            // imageSrc:'meow/tail.png',
            // framesMax:7,
        },
        stance:{
            imageSrc:'meow/peakst.png',
            framesMax:5,
        },
        run:{
            imageSrc:'meow/run.png',
            framesMax:3,
           
        },
        jump:{
            imageSrc:'meow/jump.png',
            framesMax:5,
           
        },
        takeHit:{
            imageSrc:'meow/realhitt.png',
            framesMax:4,
           
        },
        fall:{
            imageSrc:'meow/fallin.png',
            framesMax:3,
        
        },
        death:{
            imageSrc:'meow/bighit.png',
            framesMax:4,
        
        },
        attack2:{
            imageSrc:'meow/tailmove.png',
            framesMax:7,
        
        }
    } ,attackBox:{
        offset:{
            x:-130,
            y:50
        },
        width:200,
        height:100
    }
    
   
    
})


console.log(player)

const keys = {
    a: {
        pressed: false
    }, d: {
        pressed: false
    }, ArrowLeft: {
        pressed: false
    }, ArrowRight: {
        pressed: false
    },ArrowUp:{
        pressed:false
    },w:{
        pressed:false
    }
}



decreaseTimer()
 

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    Arc.update()
    shop.update()
    
    player.update()
    enemy.update()

   
    player.velocity.x=0
    enemy.velocity.x=0

    
    if (keys.a.pressed && player.lastKey==='a') {
        player.velocity.x = -25
        player.switchSprites('run')
    } else if (keys.d.pressed && player.lastKey==='d') {
        player.velocity.x = 25
        player.switchSprites('run')
    }else if (keys.w.pressed && player.lastKey==='w') {
        player.velocity.y = -10
        player.switchSprites('jump')

    }else{
    player.switchSprites('stance')

    }

//jumping
    if(player.velocity.y<0){
        player.switchSprites('jump')
    }else if(player.velocity.y>0){
        player.switchSprites('fall')
    }


   // enemy.switchSprites('stance')
    if (keys.ArrowLeft.pressed && enemy.lastKey==='ArrowLeft') {
        enemy.velocity.x = -25
        enemy.switchSprites('run')

       
    }else if (keys.ArrowRight.pressed && enemy.lastKey==='ArrowRight') {
        enemy.velocity.x = 25
        enemy.switchSprites('run')

       

    }else if (keys.ArrowUp.pressed && enemy.lastKey==='ArrowUp') {
        enemy.velocity.y = -10
        enemy.switchSprites('jump')

       
    }else{
    enemy.switchSprites('stance')
    }

    if(enemy.velocity.y<0){
        enemy.switchSprites('jump')
    }else if(enemy.velocity.y>0){
       enemy.switchSprites('fall')
    }


    // if(enemy.isAttacking&&enemy.framesCurrent===4){
    //     enemy.isAttacking=false
    // }

    //enemy gets hit
    if(
        rectangularCollision({
          rectangle1:  player,
          rectangle2:   enemy})&&
        player.isAttacking && player.framesCurrent===4
    ){
        enemy.takeHit()
        player.isAttacking=false
        enemy.velocity.x=90 //keep an eye

       // enemy.health-= 20
       document.querySelector('#enemyHealth').style.width=enemy.health +'%'

    };
 
    // if player misses
    if(player.isAttacking&&player.framesCurrent===4){
        player.isAttacking=false
    }

  // this is where our player gets hit

    if(
        rectangularCollision({
          rectangle1:  enemy,
          rectangle2:   player})&&
        enemy.isAttacking &&
         enemy.framesCurrent===4
    ){
        player.takeHit()
        enemy.isAttacking=false
         player.velocity.x=-90 //keep an eye
        document.querySelector('#playerHealth').style.width=player.health +'%'
       // console.log('くそ');
    }
   
   

    // end the game based on health
    if(enemy.health<=0 || player.health<=0){
        determineWinner({player,enemy,timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    if(!player.dead)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey='d'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey='a'
            break
        case 'w':
            player.velocity.y = -25
          break
        case' ': 
        player.velocity.y=-18
        setTimeout(() => {
        player.attack()
        player.velocity.x=80
            
        }, 300);

         break  
        case's': 
        player.velocity.x=30
        player.velocity.y=-18

        setTimeout(() => {
            player.velocity.x=90

            player.attack2()
        }, 300);
        // player.attack2()
        break  
    } 


    if(!enemy.dead){
       switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey='ArrowRight'
            
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey='ArrowLeft'

        break
        case 'ArrowUp':
            enemy.velocity.y = -25
        break
        case'l': 
        enemy.velocity.x= -75
             
         enemy.velocity.y= -20
          setTimeout(() => {
         
         enemy.attack()

            
          },300);

          //enemy.attack2()

        break
        case'ArrowDown': 
         enemy.velocity.x= -50

         setTimeout(() => {
         enemy.velocity.x= -100

            enemy.attack2()
         

         }, 30);
         //enemy.velocity.x= 40

        break
        }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
        break    
         
       
    }
    switch(event.key){
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
        break 
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break
    }
    //console.log(event.key)
})