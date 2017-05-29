import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  Component,
  AfterContentInit,
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import 'rxjs/add/observable/fromEvent';

import { SlideComponent } from '../slide/slide.component';
import * as Actions from '../actions';

interface AppState {
  slide: number;
}

@Component({
  selector: 'deck',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent {
  @ContentChildren(SlideComponent) slides: QueryList<SlideComponent>;
  displaySlide: SlideComponent;
  slide: Observable<number>;
  slideRef: number;

  constructor(private store: Store<AppState>) {
    this.slide = store.select('slide');
    this.slide.subscribe(data => {
      const lastSlide = this.slideRef;
      this.slideRef = data;
      this.displaySlide = this.slides ? this.slides.toArray()[data] : null;
      if (this.slides) {
        this.handleSlides(lastSlide > data);
      }
    });

    const keyListener = Observable.fromEvent(window, 'keydown');
    keyListener.subscribe(data => this.handleKeys(data));
  }

  ngAfterContentInit() {
    this.handleSlides(false);
  }

  handleSlides(reverse: boolean) {
    this.slides.forEach((slide, index) => {
      slide.active = index === this.slideRef;
      slide.reverse = reverse;
    });
  }

  handleKeys({ code = '' }) {
    const currentSlide = this.slideRef;
    switch (code) {
      case 'ArrowLeft':
        if (currentSlide === 0) {
          return;
        }
        this.store.dispatch(new Actions.ChangeSlide(currentSlide - 1));
        break;
      case 'ArrowRight':
        if (currentSlide + 1 > this.slides.length - 1) {
          return;
        }
        this.store.dispatch(new Actions.ChangeSlide(currentSlide + 1));
        break;
      default:
        break;
    }
  }
}
