import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../gaurd/auth.gaurd";
import { LoginGuard } from "../gaurd/login.gaurd";

import { HomepageComponent } from './homepage/homepage.component';
import { VenuesComponent } from './venues/venues.component';
import { VenuedetailsComponent } from './venuedetails/venuedetails.component';
import { EventsComponent } from './events/events.component';
import { EventsdetailComponent } from './eventsdetail/eventsdetail.component';
import { ButticketsComponent } from './buttickets/buttickets.component';
import { TicketsdetailsshwComponent } from './ticketsdetailsshw/ticketsdetailsshw.component';
import { LiveofferComponent } from './liveoffer/liveoffer.component';
import { RedeemofferComponent } from './redeemoffer/redeemoffer.component';
import { RulesofuseComponent } from './rulesofuse/rulesofuse.component';
import { SigninComponent } from './signin/signin.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { VerifyscreenComponent } from './verifyscreen/verifyscreen.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { HelpsupportComponent } from './helpsupport/helpsupport.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { PersonalinfoeditComponent } from './personalinfoedit/personalinfoedit.component';
import { VerifyyouridComponent } from './verifyyourid/verifyyourid.component';
import { PurchasehistoryComponent } from './purchasehistory/purchasehistory.component';
import { ListvenueComponent } from './listvenue/listvenue.component';
import { FeedbackusrComponent } from './feedbackusr/feedbackusr.component';
import { AboutjbclubComponent } from './aboutjbclub/aboutjbclub.component';
import { TermsconditionComponent } from './termscondition/termscondition.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';

import { HistoryDetailsComponent } from './history-details/history-details.component';
import { WeddingfunctioneventComponent } from './weddingfunctionevent/weddingfunctionevent.component';
import { WeddingfuncafterlogdetailComponent } from './weddingfuncafterlogdetail/weddingfuncafterlogdetail.component';
import { MessageforeventlogComponent } from './messageforeventlog/messageforeventlog.component';
import { ReferafriendComponent } from './referafriend/referafriend.component';
import { WrirereviewpopComponent } from './wrirereviewpop/wrirereviewpop.component';



const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'venues/:venuename',
    component: VenuesComponent
  },
  {
    path: 'venuesdetail/:id',
    component: VenuedetailsComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'eventsdetail',
    component: EventsdetailComponent
  },
  {
    path: 'buytickview',
    component: ButticketsComponent
  },
  {
    path: 'ticketsdetails',
    component: TicketsdetailsshwComponent
  },
  {
    path: 'liveoffers',
    component: LiveofferComponent
  },
  {
    path: 'reedemoffer',
    component: RedeemofferComponent
  },
  {
    path: 'rulesofuse',
    component: RulesofuseComponent
  },
  {
    path: 'usersignin',
    component: SigninComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'forgetpass',
    component: ForgetpasswordComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'verifyscreen',
    component: VerifyscreenComponent
  },
  {
    path: 'changepass',
    component: ChangepasswordComponent
  },

  {
    path: 'helpsupport',
    component: HelpsupportComponent
  },

  {
    path: 'aboutus',
    component: AboutusComponent
  },

  {
    path: 'favourites',
    component: FavouritesComponent
  },

  {
    path: 'personalinfo',
    component: PersonalinfoeditComponent
  },

  {
    path: 'verifyid',
    component: VerifyyouridComponent
  },

  {
    path: 'purchasehistory',
    component: PurchasehistoryComponent
  },

  {
    path: 'listyourvenue',
    component: ListvenueComponent
  },

  {
    path: 'feedback',
    component: FeedbackusrComponent
  },

  {
    path: 'aboutjustclubbing',
    component: AboutjbclubComponent
  },

  {
    path: 'tnc',
    component: TermsconditionComponent
  },
  {
    path: 'privacypolicy',
    component: PrivacypolicyComponent
  },

  {
    path: 'history-details',
    component: HistoryDetailsComponent
  },
  {
    path: 'weddingfunctionevent',
    component: WeddingfunctioneventComponent
  },



  {
    path: 'wedddingfuncafterlogdetail',
    component: WeddingfuncafterlogdetailComponent
  },

  {
    path: 'messagevent/:venueId',
    component: MessageforeventlogComponent
  },

  {
    path: 'refer-a-friend',
    component: ReferafriendComponent
  },

  {
    path: 'writereview',
    component: WrirereviewpopComponent
  },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClubwebRoutingModule { }
