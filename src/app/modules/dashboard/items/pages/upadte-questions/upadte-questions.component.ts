import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackbarService } from '@@shared/pages/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '@@core/services/items.service';

@Component({
  selector: 'app-upadte-questions',
  templateUrl: './upadte-questions.component.html',
  styleUrls: ['./upadte-questions.component.scss'],
})
export class UpadteQuestionsComponent implements OnInit, OnDestroy {
  questionsForm: FormGroup;
  item_id;
  questionItem: FormGroup;
  data: {};
  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private itemsService: ItemsService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.item_id = res['item'][0]['item_id'];
      this.data = res['item'][0]['data'];
    });
    this.questionsForm = this.fb.group({
      item_id: new FormControl(this.item_id, [Validators.required]),
      questions: this.fb.array([]),
    });
    for (let i = 0; i < Object.keys(this.data).length; i++) {
      console.log('res', this.data[i]['name']);

      this.addQuestion();
      this.getquestions().at(i).patchValue(this.data[i]['name']);
    }
    this.questionsForm.get('questions').patchValue(this.data);
  }
  /****************** Get Questions************************/
  getquestions() {
    return this.questionsForm.get('questions') as FormArray;
  }
  /****************** add Question************************/
  addQuestion() {
    this.questionItem = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
    this.getquestions().push(this.questionItem);
  }
  /****************** remove  Question************************/
  removeQuestion(index: number) {
    this.getquestions().removeAt(index);
  }
  /****************** Get One Question************************/
  getOneQuestion(index) {
    return this.getquestions().at(index);
  }
  /**************** Submit Function************************/

  onSubmit() {
    console.log('Form Data', this.questionsForm.value);
    this.itemsService
      .updateItem(
        this.questionsForm.get('item_id').value,
        this.questionsForm.value,
        'items/questions'
      )
      .toPromise()
      .then((next) => {
        this.snackbarService.show(next['message'], 'success');
        this.router.navigate(['/dashboard/items']);
      })
      .catch((err) => {
        this.snackbarService.show('Error', 'danger');
      });
  }
  ngOnDestroy() {}
} //end of Class
