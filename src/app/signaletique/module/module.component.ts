import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {
  @Input() title:string;
  @Input() info:string;
  @Input() modif:boolean;
  @Output() editChange: EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  onEdit(){
    this.editChange.emit();
  }

  ngOnInit() {
  }

}
