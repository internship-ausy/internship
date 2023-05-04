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
  selector: "app-add-service",
  templateUrl: "./add-service.component.html",
  styleUrls: ["./add-service.component.css"],
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
export class AddServiceComponent implements OnInit {
  addServiceForm: FormGroup;
  loading = false;
  hours = ["8 AM", "9 AM", "10 AM", "11 AM", "1 PM", "2 PM", "3 PM", "4 PM"];

  constructor(
    private location: Location,
    private dashboardService: DashboardService,
    private popoverService: PopoverService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.addServiceForm.valid && this.validateForm()) {
      this.loading = true;
      const { fullName, plateNumber, carMake, carModel, description, date, hour, WS, workloadEstimate, notes } = this.addServiceForm.value;
      const dateTimeStr = `${moment(date).format("DD/MM/YYYY")} ${hour}`;
      const dateTime = moment(dateTimeStr, "DD/MM/YYYY hh A").add(3, "h").toISOString();
      const service = new Service(fullName, plateNumber, carMake, carModel, description, dateTime, WS, workloadEstimate, notes);
      const serviceObservable = this.dashboardService.addService(service);

      serviceObservable.subscribe({
        next: (res) => {
          this.loading = false;
          this.popoverService.openSnackBarSuccess(this.translate.instant("addService.successPopover"), "OK");
          this.addServiceForm.reset();

          for (let control in this.addServiceForm.controls) {
            this.addServiceForm.controls[control].setErrors(null);
          }
        },
        error: (res) => {
          this.loading = false;
        },
      });
    }
  }

  onCancel() {
    this.addServiceForm.reset();
    this.location.back();
  }

  initForm() {
    this.addServiceForm = new FormGroup({
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
  
  validateForm() {
    let isValid = true;
    Object.keys(this.addServiceForm.controls).forEach( key => {
      if (!this.addServiceForm.controls[key].dirty && key != 'notes')
        isValid = false;
    })
    return isValid;
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
