import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@@core/http/api.service';
import { ItemsService } from '@@core/services/items.service';
import { DynamicFormComponent } from '@@shared/pages/dynamicForms/dynamic-form/dynamic-form.component';
import { Subscription } from 'rxjs';
import { FieldConfig } from '@@shared/models/field.interface';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../../../../environments/environment';
@Component({
  selector: 'app-items-options',
  templateUrl: './persons-options.component.html',
  styleUrls: ['./persons-options.component.scss'],
})
export class PersonsOptionsComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicFormComponent) formmmmm: DynamicFormComponent;
  itemsOptions: FormGroup;
  isLoadingResults = false;
  inputSubScription: Subscription;
  regConfig: FieldConfig[] = [];
  item_id = 0;
  data: {};
  person_id;
  /****************** constructor Function************************/
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private apiserv: ApiService,
    private actRoute: ActivatedRoute,
    private itemService: ItemsService,
    private http: HttpClient
  ) {}

  /****************** ngOnInit Function************************/
  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.item_id = res['item'][0]['item_id'];
      this.person_id = res['item'][0]['personId'];
      const btn = {
        type: 'button',
        label: 'Save Person Details',
      };
      for (let i = 0; i < res['item'][0]['data'].length; i++) {
        this.regConfig.push(res['item'][0]['data'][i]);
      }
      this.regConfig.push(btn);
    });
  }

  /****************** Submit Function************************/
  submit(value: any) {
    this.data = {
      item_id: this.item_id,
    };
    for (let i = 0; i < Object.entries(value).length; i++) {
      if (
        Object.entries(value)[i][0] === undefined ||
        Object.entries(value)[i][0] == 'undefined'
      ) {
        break;
      }
      this.data[Object.entries(value)[i][0]] = Object.entries(value)[i][1];
    }
    this.isLoadingResults = true;
    this.http
      .post(`${env.apiRoot}/auth/items/values`, this.data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .subscribe(
        (next) => {
          this.isLoadingResults = false;
          this.snackbarService.show(
            'Person Details Created successfully',
            'success'
          );
          this.router.navigateByUrl(
            `/dashboard/humans/persons/${this.item_id}/faces/${this.person_id}`
          );
        },
        (err) => {
          console.log('err :', err);
          this.snackbarService.show(err['error']['errors']['name'], 'danger');
        }
      );
  } //end of submit

  /****************** Destroy Function************************/
  ngOnDestroy(): void {
    // this.subscription1$.unsubscribe();
    // this.subscription2$.unsubscribe();
  } //end of destroy
} //end of  Class
