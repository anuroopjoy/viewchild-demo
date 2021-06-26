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

  @ViewChildren(ChildComponent)
  public childComponents!: QueryList<ChildComponent>;
  @ViewChild(ChildComponent, { static: true })
  public childComponent!: ChildComponent;
  @ViewChild(ChildDirective, { static: true })
  public childDirective!: ChildDirective;
  @ViewChild('elem', { static: true }) public set childVar(elem: ElementRef) {
    console.log('Viewchild changed');
    this._var = elem;
  }
  public get childVar(): ElementRef {
    return this._var;
  }
  @ViewChild('tpl', { static: true }) public childTemplate!: TemplateRef<any>;
  @ViewChild(ChildService, { static: true }) public childService!: ChildService;
  @ViewChild('childToken', { static: true }) public childToken!: any;

  private _var!: ElementRef;

  ngOnInit(): void {
    console.log('inside OnInit');
    console.log(this.childComponents);
    console.log(this.childComponent);
    console.log(this.childDirective);
    console.log(this.childVar);
    console.log(this.childTemplate);
    console.log(this.childService);
    console.log(this.childToken);
    setTimeout(() => {
      this.useInline = true;
    }, 3000);
  }
  ngAfterViewInit(): void {
    console.log('inside AfterViewInit');
    console.log(this.childComponents);
    this.childComponents.map((value) => console.log(value));
    this.childComponents.changes.subscribe(
      (values: QueryList<ChildComponent>) => {
        values.map((value) => console.log(value));
      }
    );
    console.log(this.childComponent);
    console.log(this.childDirective);
    console.log(this.childVar);
    console.log(this.childTemplate);
    console.log(this.childService);
    console.log(this.childToken);
    setTimeout(() => {
      this.names.push('SubComponent3');
    }, 3000);
  }
  ngAfterViewChecked(): void {
    console.log('inside AfterViewChecked');
  }
}
