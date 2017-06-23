import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'inv-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input() public errors: string[] = []
  @Input() public showAll: boolean = false

  /**
   * On compoent ready
   *
   *
   * @memberof ValidationMessageComponent
   */
  public ngOnInit () {
    this.errors = this.errors && this.errors.length && this.showAll
      ? [ this.errors.shift() ] as string[]
      : this.errors
  }

}
