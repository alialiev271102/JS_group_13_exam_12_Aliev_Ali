import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subscription} from "rxjs";
import {Picture} from "../models/picture.model";
import {ActivatedRoute} from "@angular/router";

@Directive({
  selector: '[appMyGallery]'
})
export class MyGalleryDirective implements OnInit, OnDestroy {


  routeSub!: Subscription;

  @Input("appMyGallery") type!: Picture;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (this.type.creatorUserId === params['id']) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
