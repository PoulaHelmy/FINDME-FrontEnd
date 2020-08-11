import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FaceApiService} from 'app/modules/dashboard/humans/services/face-api.service';
import {ToastrService} from 'ngx-toastr';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-test-face-identification',
  templateUrl: './test-face-identification.component.html',
  styleUrls: ['./test-face-identification.component.scss'],
})
export class TestFaceIdentificationComponent implements OnInit {
  isLoadingResults = false;
  faceForm: FormGroup;
  images = [];
  persons = [];
  itemDetails;

  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.faceForm = this.fb.group({
      file: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.isLoadingResults = true;
    this.toastr.success(
      ' ',
      'Upload Image Process May by Take A lot Of Time...'
    );
    this.faceApi.detect(this.b64toFile(this.images[0])).subscribe(
      (res) => {
        this.faceApi.identify('maingroup', [res[0]['faceId']]).subscribe((result) => {
          if (result[0]['candidates'][0]) {
            this.isLoadingResults = false;
            this.faceApi
              .getPerson('maingroup', result[0]['candidates'][0]['personId'])
              .subscribe((data) => {
                this.toastr.success(
                  ' ',
                  'There is SomeOne Similar To This Person In The Image'
                );
                this.router.navigateByUrl('/dashboard/humans/persons/details', {
                  state: {
                    userData: data['userData']
                  },
                });
              });
          } else {
            this.toastr.error(
              'But You Can Add This Person To Help US to Find This Person',
              'No One Similar To This Person...'
            );
            this.router.navigateByUrl('/dashboard/humans/persons/create');
          }
        });
      },
      (err) => {
        this.toastr.error(
          err['error']['message'],
          'Some Thing Wrong Please Try Again'
        );

        this.isLoadingResults = false;
      }
    );
  }

  /****************** File uploading Function************************/
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  b64toFile(dataURI): File {
    // convert the data URL to a byte string
    const byteString = atob(dataURI.split(',')[1]);

    // pull out the mime type from the data URL
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // Convert to byte array
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // Create a blob that looks like a file.
    const blob = new Blob([ab], {type: mimeString});
    blob['lastModifiedDate'] = new Date().toISOString();
    blob['name'] = 'file';

    // Figure out what extension the file should have
    switch (blob.type) {
      case 'image/jpeg':
        blob['name'] += '.jpg';
        break;
      case 'image/png':
        blob['name'] += '.png';
        break;
    }
    // cast to a File
    return <File> blob;
  }
} //end of Class
