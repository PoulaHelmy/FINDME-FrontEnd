import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/@auth/services/auth.service';
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  userDetails: {} = {
    name: '',
    email: '',
    photo: '',
    phone: '',
  };
  defImg = '../../../../assets/imgs/undraw_profile_pic_ic5t.svg';

  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    this.authServ.getDetails().subscribe((res) => {
      this.userDetails = res['data'];
      console.log(this.userDetails);
    });
  }
}
