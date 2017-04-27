import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {
  @Input() public errors: string[] = []
  @Input() public showAll: boolean = false

  /**
   *
   *
   *
   * @memberOf ValidationMessageComponent
   */
  public ngOnInit() {
    this.errors = this.errors || []
    this.errors = this.errors.length && this.showAll
      ? [ this.errors.shift() ]
      : this.errors
  }
}
