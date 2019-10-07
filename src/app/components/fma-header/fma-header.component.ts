import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { User } from 'src/app/auth/shared/services/auth/auth.service';

@Component({
  selector: 'fma-header',
  templateUrl: './fma-header.component.html',
  styleUrls: ['./fma-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FmaHeaderComponent implements OnInit {
  @Input() user: User;
  @Output() logout = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  logoutUser() {
    this.logout.emit();
  }
}
