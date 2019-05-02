import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { range, Observable } from 'rxjs';
import {map, filter, toArray} from 'rxjs/operators'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit,OnChanges {
  
  @Input()size:number=1;
  @Input()limit:number=1;
  @Input()offset:number=0;
  @Input()range:number=3;

  @Output()pageChange:EventEmitter<number>=new EventEmitter<number>();

  constructor() { }

  currentPage:number;
  totalPages:number;
  pages:Observable<number[]>;

  ngOnInit() {
    this.getPages(this.size,this.limit,this.offset)
  }
  ngOnChanges() {
    this.getPages(this.size,this.limit,this.offset)
  }

  getPages(size,limit,offset)
  {
    this.currentPage=this.getCurrentPage(limit,offset);
    this.totalPages=this.getTotalPages(size,limit);
    // this.pages=range(-this.range,(this.range*2)+1).pipe(
    //   map(a=>this.currentPage+a),
    //   filter(a=>this.isValidPageNumber(a,this.totalPages)),
    //   toArray()
    //   )
    this.pages=range(1,this.totalPages).pipe(
      map(a=>a),
      filter(a=>this.isValidPageNumber(a,this.totalPages)),
      toArray()
      )

  }
  getCurrentPage(limit,offset)
  {
    return Math.floor(offset/limit)+1
  }
  getTotalPages(size,limit)
  {
    return Math.ceil(Math.max(size,1)/Math.max(limit,1))
  }
  isValidPageNumber(page,total_pages)
  {
    return page>0 && page<=total_pages
  }
  selectPage(page,event)
  {
   this.cancelEvent(event)
   if(this.isValidPageNumber(page,this.totalPages))
   this.pageChange.emit((page-1)*this.limit)//emitting the new offset
  }

  cancelEvent(event)
  {
    event.preventDefault();
  }

}
