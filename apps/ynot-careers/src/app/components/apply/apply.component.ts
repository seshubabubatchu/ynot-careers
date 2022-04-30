import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NgForm,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatesService } from '@ynot-careers/candidates';
import { JobsService } from '@ynot-careers/jobs';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ynot-careers-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css'],
})
export class ApplyComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private candidateService: CandidatesService,
    private messageservice: MessageService,
    private routing: Router
  ) {}

  ngOnInit(): void {
    // this.setDefs();
    this.initializeApplyForm();
    // this.setvalues();
    this.router.params.subscribe((params) => {
      console.log(params);
      this.jobId = params.id;
    });
  }

  //declarations
  applyForm: FormGroup;
  jobId = '';
  ubscriptions: Subscription[] = [];
  //methods
  initializeApplyForm() {
    // this.applyForm = new FormGroup({
    //   firstName: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(3),
    //   ]),
    //   lastName: new FormControl('', [Validators.required]),
    //   email: new FormControl('', [Validators.required]),
    //   gender: new FormControl('', [Validators.required]),
    //   payRate: new FormControl('', [Validators.required]),
    //   address: new FormGroup({
    //     city: new FormControl('', [Validators.required]),
    //     state: new FormControl('', [Validators.required]),
    //     country: new FormControl('', [Validators.required]),
    //   }),
    // });
    this.applyForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      payRate: ['', [Validators.required]],
      address: this.fb.group({
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
      }),
      skills: this.fb.array([]),
    });
  }
  get skills(): FormArray {
    return this.applyForm.get('skills') as FormArray;
  }
  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: '',
    });
  }
  addSkills() {
    this.skills.push(this.newSkill());
  }
  removeSkill(i: number) {
    this.skills.removeAt(i);
  }
  onapplySubmit() {
    console.log(this.applyForm.value);
    let sub1$ = this.candidateService
      .postaCandidate(this.jobId, this.applyForm.value)
      .subscribe(
        (data) => {
          console.log(data);
          this.messageservice.add({
            severity: 'success',
            summary: 'Applied Sucessfully',
          });
          this.routing.navigateByUrl(`job/${this.jobId}/applyThankyou`);
        },
        (error) => {
          console.log(error);
          this.messageservice.add({
            severity: 'error',
            summary: 'Cannot Apply to this Job ',
          });
        }
      );
    this.ubscriptions.push(sub1$);
  }
  //Below template driven set and patch value
  // setDefs() {
  //   setTimeout(() => {
  //     // this.applyForm.control.patchValue({
  //     //   firstName: 'seshu',
  //     // });
  //     // this.applyForm.control.setValue({
  //     //   firstName: 'Seshu',
  //     //   lastName: 'Babu',
  //     //   email: 'seshu@email.com',
  //     //   address: 'test address',
  //     //   gender: 'male',
  //     //   payrate: 244,
  //     // });
  //this.applyForm.control.get('address').setValue({cit:'',state:'',country:''})
  //this.applyForm.control.get('address').patchValue({cit:'',state:'',country:''})
  //this.applyForm.control.get('firstName').setValue('mani')
  //     // this.applyForm.controls['firstName'].patchValue('seshu');
  //     // this.applyForm.controls['lastName'].setValue('Babu');
  //     this.applyForm.form.patchValue({ firstName: 'seshu' });
  //     this.applyForm.form.setValue({
  //       firstName: 'Seshu',
  //       lastName: 'Babu',
  //       email: 'seshu@email.com',
  //       address: 'test address',
  //       gender: 'male',
  //       payrate: 244,
  //     });
  //     this.applyForm.form.patchValue({
  //       firstName: 'Seshu',
  //       lastName: 'Babu',
  //     });
  //   }, 2000);
  // }
  //below reactive forms
  // setvalues() {
  //   setTimeout(() => {
  //     this.applyForm.setValue({
  //       firstName: 'sesshu',
  //       lastName: 'manish',
  //       email: 'seshu@email.com',
  //       gender: 'male',
  //       payRate: 123,
  //       address: { city: 'america', state: 'india', country: 'china' },
  //     });
  //     this.applyForm
  //       .get('address')
  //       .setValue({ city: 'afganishtan', state: 'aff', country: 'c1' });
  //     this.applyForm.get('address').patchValue({ city: 'patched' });
  //     this.applyForm.get('firstName').setValue('firstName by set val');
  //     this.applyForm.controls['address'].patchValue({
  //       city: 'patched by template',
  //     });
  //   }, 2000);
  // }
  ngOnDestroy(): void {
    this.ubscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    this.ubscriptions = [];
  }
}
