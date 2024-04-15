let bg = ["#d0b8ac"]
let color = ["#C33F8C", "#DCA02C", "#1D8091"];


var patterns=[]  //所有圖案的資料
var pattern
var score=0
class pattern_class{  //宣告一個pattern_class物件
  constructor(args){
    this.p=args.p||{x:width/2,y:height/2};
    this.w=args.w||random(50,120)
    this.c=args.c||random(color)
    this.d=args.d||random(30,300)
    this.v=args.v||{x:random(-2,1),y:random(-3,1)}
    this.rotate_num = int(random(4)) * 90;
  }
  draw(){
    push();
    translate(this.p.x, this.p.y);
    rotate(this.rotate_num);

    strokeWeight(20);
    stroke(this.c);
    noFill();

    for (let a = 0; a < this.w * 0.9; a = a + this.w / 2) {
      arc(0, -this.d / 2, this.d - a, this.d - a, 90, 180);
      arc(0, -this.d / 2, this.d - a, this.d - a, 0, 90);
      line(-this.d / 2, this.d / 6 + a / 2, this.d / 2, this.d / 6 + a / 2);
    }
    pop();
  }
  update(){
      this.p.x=this.p.x+this.v.x
      this.p.y=this.p.y+this.v.y

    if(this.p.x<0){
      this.v.x=-this.v.x
    }
    if(this.p.x>width){
      this.v.x=-this.v.x
    }
    if(this.p.y<0){
      this.v.y=-this.v.y
    }
    if(this.p.y>height){
      this.v.y=-this.v.y
    }
  }
  isballInRange(){  //計算
    //d:把目前這個物件的位置與滑鼠間的距離
    let d=dist(mouseX,mouseY,this.p.x,this.p.y)
    if(d<this.w){
      return true
    }else{
      return false
    }

  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bg);
  for(i=0;i<25;i=i+1){  //產生幾個
    pattern=new pattern_class({ //傳一段參數值到class，以參數為主
      p:{x:random(0,width),y:random(0,height)},
    })
  patterns.push(pattern)  //把數據存入
  }
}
function draw() {
  background(bg);
  textSize(70)
  text("分數："+score,50,120)
  for(j=0;j<patterns.length;j=j+1){
    pattern=patterns[j]
    pattern.draw()
    pattern.update()
    if(pattern.isballInRange()){
      pattern.v.x=pattern.v.x+0.5
      pattern.v.y=pattern.v.y+0.5
    }
  }
}
function mousePressed(){  
  for(let pattern of patterns){  //balls放者所有的物件，每次就拿出一個物件放入ball
    if(pattern.isballInRange()){
        patterns.splice(patterns.indexOf(pattern),1) //刪除一個物件
        score=score+1
    }
  }
  textSize(50)
  text(score,50,80)
}
