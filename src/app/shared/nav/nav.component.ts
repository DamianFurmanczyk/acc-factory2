import { Component, OnInit, Input } from '@angular/core';
import { StateService } from './../../core/services/state.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() homepageStyles = false;
  @Input() reviewStyles = false;

  constructor(public stateS: StateService) { }

  ngOnInit() {
  }

}
