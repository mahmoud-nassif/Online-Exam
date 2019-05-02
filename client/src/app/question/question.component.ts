import { Component, OnInit } from '@angular/core';
import { Question } from './question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
 items = [
    {
    "body": "what does oop stands for",
    "options": ["object oriented programming","one one per"],
    "answer": 0,
    },
    {
      "body": "do you love programming",
      "options": ["true","false"],
      "answer": 0,
    },
    {
      "body": "do you love microsoft",
      "options": ["true","false"],
      "answer": 1,
    },
    {
      "body": "do you love mean stack",
      "options": ["true","false"],
      "answer": 0,
    },
    {
      "body": "what of the following is red",
      "options": ["mango","carrot","tomato"],
      "answer": 2,
     },
    {
      "body": "do you know about microservices",
      "options": ["yes","no"],
      "answer": 1,
    },
    {
      "body": "what is your sex",
      "options": ["male","female"],
      "answer": 0,
    },
    {
      "body": "what is docker used for",
      "options": ["testing","deploying","both"],
      "answer": 2,
    }
  ];
  current;

  size=this.items.length;
  limit=1;
  offset=0;//changes though now i'm famous

  timeUp:boolean=false;
   questionsArray:any[]=[];
  constructor() { }

  ngOnInit() {
   // this.current=this.paginator(this.items)
   this.paging(this.offset)
  }

  paginator(items=[],page=1,per_page=1)
  {

   let total_pages=Math.ceil(items.length/per_page);
   let offset=(page-1)*per_page;
   let paginatedData=items.slice(offset).slice(0,per_page)

   return {
    page:page,
    per_page:per_page,
    next_page:(total_pages>=page+1) ? page+1 : null,
    pre_page:(page-1>0) ? page-1 : null,
    total_items:items.length,
    total_pages:total_pages,
    data:paginatedData
   };
  }

  next(current)
  {
    console.log("inside next")
    console.log(current.next_page)
    if(current.next_page==null)current.next_page=current.total_pages
    this.current=this.paginator(this.items,current.next_page);
  }

  previous(current)
  {
    console.log("inside previous")
    console.log(current.pre_page)
    if(current.pre_page==null)current.pre_page=current.page
    this.current=this.paginator(this.items,current.pre_page);
  }

  onPageChange(newOffset)
  {
    //console.log("new offset",newOffset)
    this.offset=newOffset;
    this.paging(newOffset);
  }

  paging(offset)
  {
    return this.questionsArray=this.items.slice(offset).slice(0,this.limit)
  }

  onTimeUp(status)
  {
    this.timeUp=status;
  }

}
