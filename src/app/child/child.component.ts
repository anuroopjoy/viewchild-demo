import { Component, Input, OnInit } from '@angular/core';
import { ChildService } from '../child.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  providers: [ChildService,
    { provide: 'childToken', useValue: 'Text' }]
})
export class ChildComponent implements OnInit {

  @Input() public name: string = '';
  constructor(private childService: ChildService) { }

  ngOnInit(): void {
    this.childService.log();
  }

}
