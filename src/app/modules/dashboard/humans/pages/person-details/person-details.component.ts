import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FaceApiService } from 'app/modules/dashboard/humans/services/face-api.service';
import { ToastrService, Toast } from 'ngx-toastr';
import { ItemsService } from '@@core/services/items.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
})
export class PersonDetailsComponent implements OnInit {
  isLoadingResults = false;
  personId;
  itemDetails;

  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private itemServ: ItemsService
  ) {}

  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.itemDetails = res['item'][0]['data'];
      this.personId = res['item'][0]['personId'];
    });
  }

  makeRequest(id) {
    this.router.navigateByUrl(`/dashboard/requests/create/${id}`);
  }
} //end of Class
