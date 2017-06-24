import { Component } from '@angular/core'
import { GRC_CONFIG } from 'app/core'

@Component({
  selector: 'inv-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  version: string = GRC_CONFIG.version
}
