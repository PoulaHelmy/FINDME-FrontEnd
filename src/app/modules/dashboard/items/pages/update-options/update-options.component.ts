import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {DynamicFormComponent} from '@@shared/pages/dynamicForms/dynamic-form/dynamic-form.component';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Subscription} from 'rxjs';
import {FieldConfig} from '@@shared/models/field.interface';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ItemsService} from '@@core/services/items.service';

@Component({
  selector: 'app-update-options',
  templateUrl: './update-options.component.html',
  styleUrls: ['./update-options.component.scss'],
})
export class UpdateOptionsComponent implements OnInit, OnDestroy {
  @ViewChild(DynamicFormComponent) formmmmm: DynamicFormComponent;
  itemsOptions: FormGroup;
  isLoadingResults = false;

  regConfig: FieldConfig[] = [];
  item_id = 0;
  data: {};

  /****************** constructor Function************************/
  constructor(
    private snackbarService: SnackbarService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private itemService: ItemsService
  ) {
  }

  /****************** ngOnInit Function************************/
  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      // console.log('rererer', res);
      this.item_id = res['item'][0]['item_id'];
      const btn = {
        type: 'button',
        label: 'Save Data',
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
    this.itemService.updateItemOptions(this.item_id, this.data).subscribe(
      () => {
        this.isLoadingResults = false;
        this.snackbarService.show(
          'Item Details Updated successfully',
          'success'
        );
        this.router.navigate(['/dashboard/items/upquestions/' + this.item_id]);
      },
      (err) => {
        console.log('err :', err);
        this.isLoadingResults = false;
        this.snackbarService.show(err['error']['errors']['name'], 'danger');
      }
    );
  } //end of submit

  /****************** ngOnDestroy Function************************/
  ngOnDestroy(): void {
  } //end of ngOnDestroy
} //end of Calss
