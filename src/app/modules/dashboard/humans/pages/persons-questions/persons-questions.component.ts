import {Component, OnInit, OnDestroy} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import {SnackbarService} from '@@shared/pages/snackbar/snackbar.service';
import {Router, ActivatedRoute, NavigationStart} from '@angular/router';
import {ItemsService} from '@@core/services/items.service';

@Component({
  selector: 'app-persons-questions',
  templateUrl: './persons-questions.component.html',
  styleUrls: ['./persons-questions.component.scss'],
})
export class PersonsQuestionsComponent implements OnInit, OnDestroy {
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
  ) {
  }

  ngOnInit(): void {
    this.item_id = this.actRoute.snapshot.paramMap.get('id');
    // console.log('item_id ', this.item_id);
    this.questionsForm = this.fb.group({
      item_id: new FormControl(this.item_id, [Validators.required]),
      questions: this.fb.array([]),
    });
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
    // console.log('Form Data', this.questionsForm.value);
    this.itemsService
      .addItem(this.questionsForm.value, 'items/questions')
      .toPromise()
      .then((next) => {
        // console.log('res : :  :', next);
        this.snackbarService.show(next['message'], 'success');
        this.router.navigateByUrl('/dashboard/items');
      })
      .catch((err) => {
        this.snackbarService.show('Error', 'danger');
      });
  }

  ngOnDestroy() {
  }
} //end of Class
