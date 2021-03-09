import { NgModule } from '@angular/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { OwnersRoutingModule } from './owners-routing.module';
import { OwnersComponent } from './owners.component';
import { HeaderafterloginComponent } from './headerafterlogin/headerafterlogin.component';
import { ManagevenuesComponent } from './managevenues/managevenues.component';
import { FooterownerComponent } from './footerowner/footerowner.component';
import { EditvenuesComponent } from './editvenues/editvenues.component';
import { UploadsliderimagesComponent } from './uploadsliderimages/uploadsliderimages.component';
import { VenuetypeinfosComponent } from './venuetypeinfos/venuetypeinfos.component';
import { HappyhoursComponent } from './happyhours/happyhours.component';
import { ManageeventsComponent } from './manageevents/manageevents.component';
import { EventsdetailsComponent } from './eventsdetails/eventsdetails.component';
import { EditevntsComponent } from './editevnts/editevnts.component';
import { ManageliveoffersComponent } from './manageliveoffers/manageliveoffers.component';
import { LicenseqctrlComponent } from './licenseqctrl/licenseqctrl.component';
import { PaymentslcComponent } from './paymentslc/paymentslc.component';
import { HirerequestpostedComponent } from './hirerequestposted/hirerequestposted.component';
import { SequrityhirerequestComponent } from './sequrityhirerequest/sequrityhirerequest.component';
import { CreateeventsComponent } from './createevents/createevents.component';
import { CreatevenuesComponent } from './createvenues/createvenues.component';
import { TncComponent } from './tnc/tnc.component';
import { ForclubsbarsComponent } from './forclubsbars/forclubsbars.component'
import { ViewliveofferComponent } from './viewliveoffer/viewliveoffer.component';
import { EditliveofferComponent } from './editliveoffer/editliveoffer.component';
import { CreateliveofferComponent } from './createliveoffer/createliveoffer.component';
import { EditliveoffertimebasedComponent } from './editliveoffertimebased/editliveoffertimebased.component';
import { OffertitlehelpComponent } from './offertitlehelp/offertitlehelp.component';
import { ExtrainfoshelpComponent } from './extrainfoshelp/extrainfoshelp.component';
import { ListVenueComponent } from './list-venue/list-venue.component';
import { ForclubeventsComponent } from './forclubevents/forclubevents.component';
import { ForclubliveofferComponent } from './forclubliveoffer/forclubliveoffer.component';
import { ForclubnotifyComponent } from './forclubnotify/forclubnotify.component';
import { ManagebookingsComponent } from './managebookings/managebookings.component';
import { BookingdetailComponent } from './bookingdetail/bookingdetail.component';
import { HeaderloginbackbtnComponent } from './headerloginbackbtn/headerloginbackbtn.component';
import { RulesofuseComponent } from './../shared/rulesofuse/rulesofuse.component';
import { AgmCoreModule } from '@agm/core';
import { OwlModule } from 'ngx-owl-carousel';
import { AddhappyhoursComponent } from './addhappyhours/addhappyhours.component';
import { CountdownModule } from 'ngx-countdown';
import { LiveofferdataComponent } from './liveofferdata/liveofferdata.component';
import { VoucherComponent } from './voucher/voucher.component';
@NgModule({
  declarations: [
    OwnersComponent,
    HeaderafterloginComponent,
    ManagevenuesComponent,
    FooterownerComponent,
    EditvenuesComponent,
    UploadsliderimagesComponent,
    VenuetypeinfosComponent,
    HappyhoursComponent,
    ManageeventsComponent,
    EventsdetailsComponent,
    EditevntsComponent,
    ManageliveoffersComponent,
    LicenseqctrlComponent,
    PaymentslcComponent,
    HirerequestpostedComponent,
    SequrityhirerequestComponent,
    CreateeventsComponent,
    CreatevenuesComponent,
    TncComponent,
    ForclubsbarsComponent,
    ViewliveofferComponent,
    EditliveofferComponent,
    CreateliveofferComponent,
    EditliveoffertimebasedComponent,
    OffertitlehelpComponent,
    ExtrainfoshelpComponent,
    ListVenueComponent,
    ForclubeventsComponent,
    ForclubliveofferComponent,
    ForclubnotifyComponent,
    ManagebookingsComponent,
    BookingdetailComponent,
    HeaderloginbackbtnComponent,
    AddhappyhoursComponent,
    RulesofuseComponent,
    LiveofferdataComponent,
    VoucherComponent,
  ],
  imports: [
    CommonModule,
    OwnersRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    CdkTableModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    MatSnackBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCPGDbuZIxAykFZ7Mtva26GpmVzhZTJ3Ww'
    }),
    OwlModule,
    CountdownModule
  ],
  entryComponents: [
    UploadsliderimagesComponent,
    HappyhoursComponent,
    AddhappyhoursComponent,
    RulesofuseComponent
  ],

})
export class OwnersModule { }
