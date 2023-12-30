import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface ILine{
  x1 : number;
  y1 : number;
  x2 : number;
  y2 : number;
}
interface ICross{
  line1 : ILine;
  line2 : ILine;
}
interface ICircle{
  cx : number;
  cy : number;
  radius : number;
}

interface IBox{
  point: string;
  row: number;
  column: number;
  cross : ICross;
  circle : ICircle;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  title = 'tictac';
  board:IBox[];
  xgap:number=10;
  ygap:number=10;
  gridCount:number=3;
  constructor(){
    this.board = [];
  }
  ngOnInit(){
    

  }
  onpolygonclick(event:MouseEvent){
    console.log("onpolygonclick event ",event.target)
    // console.log("target ",event.target)
    // let row = event.target
    // let dataset = event.target.att
    
  }
  svgclick($event: any){
    console.log("svgclick $event ",$event)
  }
  clickDiv(){
    console.log("in clickDiv()")
    this.createBoard();
  }

  box(x:number,y:number,row:number,column:number){
    let topleft = `${x},${y}`;

    let toprightX = x+this.xgap;
    let topright = `${toprightX},${y}`;

    let bottomrightX = x+this.xgap;
    let bottomrightY = y+this.ygap;
    let bottomright = `${bottomrightX},${bottomrightY}`;

    let bottomleftY = y+this.ygap;
    let bottomleft = `${x},${bottomleftY}`;
    
    let point = `${topleft} ${topright} ${bottomright} ${bottomleft}`;
    
    // topleft , bottomright 
    let line1 = {x1 : x + 3 , y1 : y + 3 , x2 : bottomrightX - 3, y2: bottomrightY - 3 };
    // topright , bottomleft 
    let line2 = {x1 : toprightX - 3 , y1 : y+3 , x2 : x + 3, y2: bottomleftY - 3 };
    let cross : ICross = { line1 , line2};

    let cx = ((x + toprightX)/2);
    let cy = ((y + bottomleftY)/2);
    let circle = {cx ,cy , radius : 2.5 };
    
    let boxItem:IBox = {point, row, column , cross , circle };
    return boxItem;
  }
  
  createBoard(){
    this.board = [];
    let row=0;
    for(let i=50; i<(50 + (this.xgap * this.gridCount)); i=i+this.xgap){

      let column=0;
      for(let j=5; j<(5 + (this.ygap * this.gridCount));j=j+this.ygap){
        this.board.push(this.box(i,j,column,row));
        column++;
      }
      row++;
    }
    console.log("board ",this.board)
  }
}
