import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { DashboardService } from "../dashboard.service";
import { PopoverService } from "src/app/shared/core/services/popover.service";
import { TranslateService } from "@ngx-translate/core";
import { Service } from "src/app/shared/models/service.model";
import * as moment from "moment";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
// import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { ActivatedRoute, Params } from "@angular/router";
import { EditService } from "src/app/shared/models/editService.model";
import { take } from "rxjs";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "app-edit-service",
  templateUrl: "./edit-service.component.html",
  styleUrls: ["./edit-service.component.css"],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "ro-RO" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class EditServiceComponent implements OnInit {
  editServiceForm: FormGroup;
  loading = false;
  hours = ["8 AM", "9 AM", "10 AM", "11 AM", "1 PM", "2 PM", "3 PM", "4 PM"];
  id : number;
  

  constructor(
    private location: Location,
    private dashboardService: DashboardService,
    private popoverService: PopoverService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe((params : Params)=> {
      this.id = +params['id'];
    });
    console.log(this.id);
    let test = this.dashboardService.getReservation(this.id);
    this.dashboardService.getReservation(2).subscribe(data => {
      console.log(data);
    });
    /*this.dashboardService.getReservation(this.id).subscribe(response => {
      const reservation = response.data;
      const editServiceObj = new EditService(
        //reservation.id,
        reservation.fullName,
        reservation.plateNumber,
        reservation.carMake,
        reservation.carModel,
        reservation.description,
        new Date(reservation.date),
        reservation.workStation,
        reservation.estimate,
        reservation.notes
      );
      this.editServiceForm.setValue(editServiceObj);
    });*/
  }

  onSubmit() {
    if (this.editServiceForm.valid) {
      this.loading = true;
      const { fullName, plateNumber, carMake, carModel, description, date, hour, WS, workloadEstimate, notes } = this.editServiceForm.value;
      const dateTimeStr = `${moment(date).format("DD/MM/YYYY")} ${hour}`;
      const dateTime = moment(dateTimeStr, "DD/MM/YYYY hh A").add(3, "h").toISOString();
      const editedService = new EditService(this.id,fullName, plateNumber, carMake, carModel, description, dateTime, WS, workloadEstimate, notes);
      this.popoverService.openSnackBarAction(
       this.translate.instant("editService.saveTitle"),this.translate.instant("editService.saveMessage"),this.translate.instant("editService.cancel"),"Ok"
      );
      this.popoverService.actionPopoverEmitter.pipe(take(1)).subscribe(okButtonPressed => {
        if(okButtonPressed)
        {
          const serviceObservable = this.dashboardService.editService(editedService);

      serviceObservable.subscribe({
        next: (res) => {
          this.loading = false;
          this.popoverService.openSnackBarSuccess(this.translate.instant("editService.successPopover"), "OK");
          this.editServiceForm.reset();

          for (let control in this.editServiceForm.controls) {
            this.editServiceForm.controls[control].setErrors(null);
          }
        },
        error: (res) => {
          this.loading = false;
        },
      });
        }
      })
    }
  }

  onCancel() {
    this.popoverService.openSnackBarAction(
      this.translate.instant("editService.cancelTitle"),
          this.translate.instant("editService.cancelMessage"),this.translate.instant("editService.cancel"),"Ok");
     this.popoverService.actionPopoverEmitter.pipe(take(1)).subscribe(okButtonPressed => {
      if(okButtonPressed)
      {
        this.editServiceForm.reset();
    this.location.back();
      }
    })
  }

  

  initForm() {
    this.editServiceForm = new FormGroup({
      fullName: new FormControl("", [Validators.required, this.fullNameNotValid]),
      plateNumber: new FormControl("", [Validators.required, this.plateNumberNotValid]),
      carMake: new FormControl("", Validators.required),
      carModel: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      hour: new FormControl("", Validators.required),
      WS: new FormControl("", [Validators.required, this.WSNotValid]),
      workloadEstimate: new FormControl("", [Validators.required, this.workloadEstimateNotValid]),
      notes: new FormControl(""),
    });
  }

  noWeekendsFilter = (m: moment.Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  };

  fullNameNotValid(control: FormControl): ValidationErrors | null {
    let regex = "^[a-zA-Z.]{3,} [a-zA-Z]{3,}$";
    if (!control.value?.match(regex)) return { fullNameNotValid: true };
    return null;
  }

  plateNumberNotValid(control: FormControl): ValidationErrors | null {
    let regex = "^[A-Z]{1,2} [0-9]{2,3} [A-Z]{3}$";
    if (!control.value?.match(regex)) return { plateNumberNotValid: true };
    return null;
  }

  dateNotValid(control: FormControl): ValidationErrors | null {
    let regex = "^[0-9]{2}/[0-9]{2}/[0-9]{4}$";
    if (!control.value?.match(regex)) return { dateNotValid: true };
    return null;
  }

  WSNotValid(control: FormControl): ValidationErrors | null {
    let regex = "^[1-3]$";
    if (!control.value?.match(regex)) return { WSNotValid: true };
    return null;
  }

  workloadEstimateNotValid(control: FormControl): ValidationErrors | null {
    let regex = "^([0-9]{1,})$";
    if (!control.value?.match(regex)) return { workloadEstimateNotValid: true };
    return null;
  }
}
