import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../store/types";

@Directive({
  selector: '[appCreateGallery]'
})
export class CreateGalleryDirective implements OnInit, OnDestroy {

  routeSub!: Subscription;

  @Input("appCreateGallery") type!: (User | null);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.viewContainer.clear();
      if (this.type?._id === params['id']) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}


