import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { ChildDirective } from './child.directive';
import { ChildService } from './child.service';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  title = 'viewchild-app';
  useInline = false;
  names = ['SubComponent', 'SubComponent1', 'SubComponent2'];
  name = 'SubComponent';

  @ViewChild(ChildComponent, { static: true, read: ViewContainerRef })
  public childComponent!: ChildComponent;
  @ViewChild(ChildDirective) public childDirective!: ChildDirective;
  @ViewChild(TemplateRef) public childTemplate!: TemplateRef<any>;
  @ViewChild(ChildService) public childService!: ChildService;
  @ViewChild('childToken') public childToken!: any;
  @ViewChild('elem') public set childVar(elem: ElementRef) {
    console.log('Viewchild changed');
    console.log(elem);
    this._var = elem;
  }
  public get childVar(): ElementRef {
    return this._var;
  }
  @ViewChildren(ChildComponent)
  public childComponents!: QueryList<ChildComponent>;
  private _var: any;

  ngOnInit(): void {
    console.log('inside OnInit');
    console.log(this.childComponent);
  }
  ngAfterViewInit(): void {
    console.log('inside AfterViewInit');
    console.log(this.childComponents);
    this.childComponents.map((val) => console.log(val));
    this.childComponents.changes.subscribe((result: QueryList<ChildComponent>) => {
      result.map((val) => console.log(val));
    });
    console.log(this.childComponent);
    console.log(this.childDirective);
    console.log(this.childTemplate);
    console.log(this.childService);
    console.log(this.childToken);
    console.log(this.childVar);
    setTimeout(() => {
      this.useInline = true;
    }, 3000);
    setTimeout(() => {
      this.names.push('SubComponent3')
    }, 3000);
  }
  ngAfterViewChecked(): void {
    console.log('inside AfterViewChecked');
  }
}
