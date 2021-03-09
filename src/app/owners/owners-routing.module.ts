import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../gaurd/auth.gaurd";

import { OwnersComponent } from './owners.component';
import { ManagevenuesComponent } from './managevenues/managevenues.component';
import { EditvenuesComponent } from './editvenues/editvenues.component';
import { VenuetypeinfosComponent } from './venuetypeinfos/venuetypeinfos.component';
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
import { ManagebookingsComponent } from './managebookings/managebookings.component';
import { BookingdetailComponent } from './bookingdetail/bookingdetail.component';
import { ForclubnotifyComponent } from './forclubnotify/forclubnotify.component';

const routes: Routes = [

  {
    path: '',
    component: OwnersComponent
  },

  {
    path: 'managevenues',
    component: ManagevenuesComponent
  },

  {
    path: 'editvenues/:venueId',
    component: EditvenuesComponent
  },

  {
    path: 'venueinf',
    component: VenuetypeinfosComponent
  },


  {
    path: 'manageevents',
    component: ManageeventsComponent
  },

  {
    path: 'eventsdetail',
    component: EventsdetailsComponent
  },

  {
    path: 'editevents',
    component: EditevntsComponent
  },

  {
    path: 'manageliveofers',
    component: ManageliveoffersComponent
  },

  {
    path: 'licencedsecurity',
    component: LicenseqctrlComponent
  },

  {
    path: 'payments',
    component: PaymentslcComponent
  },

  {
    path: 'hirerequestposted',
    component: HirerequestpostedComponent
  },

  {
    path: 'sequrityhirerequest',
    component: SequrityhirerequestComponent
  },

  {
    path: 'createevents',
    component: CreateeventsComponent
  },

  {
    path: 'createvenues',
    component: CreatevenuesComponent
  },

  {
    path: 'tnc',
    component: TncComponent
  },

  {
    path: 'forclubs-and-bars',
    component: ForclubsbarsComponent
  },

  {
    path: 'viewliveoffer/:offerId',
    component: ViewliveofferComponent
  },

  {
    path: 'editliveoffer/:offerId',
    component: EditliveofferComponent
  },

  {
    path: 'createliveoffer',
    component: CreateliveofferComponent
  },
  {
    path: 'editliveoffertimebased',
    component: EditliveoffertimebasedComponent
  },


  {
    path: 'offrtitle',
    component: OffertitlehelpComponent
  },

  {
    path: 'extinfos',
    component: ExtrainfoshelpComponent
  },

  {
    path: 'owner-list-venue',
    component: ListVenueComponent
  },
  {
    path: 'managebookings',
    component: ManagebookingsComponent
  },

  {
    path: 'bookingdetails/:messageId',
    component: BookingdetailComponent
  },

  {
    path: 'sendnotification',
    component: ForclubnotifyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnersRoutingModule { }
