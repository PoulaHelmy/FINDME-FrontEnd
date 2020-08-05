import {Component, OnInit, OnDestroy} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ItemsService} from '@@core/services/items.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.scss'],
})
export class UpdateRequestComponent implements OnInit, OnDestroy {
  requestForm: FormGroup;
  item_id;
  questionItem: FormGroup;
  data: {};
  newData = [];
  request_id;

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router,
    private itemsService: ItemsService,
    private actRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.item_id = res['item']['item_id'];
      this.data = res['item'];
    });
    this.requestForm = this.fb.group({
      item_id: new FormControl(this.item_id, [Validators.required]),
      name: new FormControl(this.data['name'], [
        Validators.required,
        Validators.minLength(5),
      ]),
      des: new FormControl(this.data['description'], [
        Validators.required,
        Validators.minLength(20),
      ]),
      questions: this.fb.array([]),
    });
    for (let i = 0; i < Object.keys(this.data['AllQuestions']).length; i++) {
      this.addQuestion();
      this.getquestions()
        .at(i)
        .patchValue(this.data['AllQuestions'][i]['question']);
      this.getquestions().at(i).get('question').disable();
      this.newData.push({
        question: this.data['AllQuestions'][i]['question'],
        answer: this.data['AllQuestions'][i]['answer'],
      });
    }
    this.requestForm.get('questions').patchValue(this.newData);
    this.request_id = this.actRoute.snapshot.params.id;
  }

  /****************** Get Questions************************/
  getquestions() {
    return this.requestForm.get('questions') as FormArray;
  }

  /****************** add Question************************/
  addQuestion() {
    this.questionItem = this.fb.group({
      question: new FormControl({vale: '', disabled: true}, [
        Validators.required,
      ]),
      answer: new FormControl('', [Validators.required]),
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
    // console.log('Form Data', this.requestForm.getRawValue());
    this.itemsService
      .updateItem(this.request_id, this.requestForm.getRawValue(), 'requests')
      .toPromise()
      .then((next) => {
        this.snackbarService.show(next['message'], 'success');
        this.router.navigate(['/dashboard/requests']);
      })
      .catch((err) => {
        this.snackbarService.show(err['error']['message'], 'danger');
      });
  }

  ngOnDestroy() {
  }
} //end of Class
