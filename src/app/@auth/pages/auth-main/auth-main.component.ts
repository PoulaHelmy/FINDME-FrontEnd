import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.scss'],
})
export class AuthMainComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}

/*
show user
{{url}}/api/auth/user
{
    "success": true,
    "data": {
        "user": {
            "id": 3,
            "name": "Poula Helmy Mousa",
            "email": "poula0122016@gmail.com",
            "phone": "201245486456",
            "active": 1,
            "avatar": "avatar.png",
            "email_verified_at": null,
            "deleted_at": null,
            "created_at": "2020-05-29T15:59:50.000000Z",
            "updated_at": "2020-05-29T16:00:44.000000Z",
            "avatar_url": "/storage/avatars/3/avatar.png"
        }
    },
    "message": "Success To Retrieve the current Auth User Data"
}

{{url}}/api/auth/update









*/
