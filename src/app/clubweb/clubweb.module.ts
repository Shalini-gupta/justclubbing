import { NgModule } from '@angular/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';



import { ClubAndBarComponent } from "./../shared/clubAndBar/clubAndBar.component";
import { OtherTilesComponent } from "./../shared/otherTiles/otherTiles.component";
import { NewsSubscribeComponent } from "./../shared/news-subscribe/news-subscribe.component";

import { ClubwebRoutingModule } from './clubweb-routing.module';
import { ClubwebComponent } from './clubweb.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ClubheaderComponent } from './clubheader/clubheader.component';
import { ClubheaderHomeComponent } from './clubheader-home/clubheader-home.component';
import { WebfooterComponent } from './webfooter/webfooter.component';
import { VenuesComponent } from './venues/venues.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { SidebaraccountComponent } from './sidebaraccount/sidebaraccount.component';
import { PersonalinfoeditComponent } from './personalinfoedit/personalinfoedit.component';
import { VerifyyouridComponent } from './verifyyourid/verifyyourid.component';
import { PurchasehistoryComponent } from './purchasehistory/purchasehistory.component';
import { ListvenueComponent } from './listvenue/listvenue.component';
import { FeedbackusrComponent } from './feedbackusr/feedbackusr.component';
import { AboutjbclubComponent } from './aboutjbclub/aboutjbclub.component';
import { TermsconditionComponent } from './termscondition/termscondition.component';
import { HistoryDetailsComponent } from './history-details/history-details.component';
import { WeddingfunctioneventComponent } from './weddingfunctionevent/weddingfunctionevent.component';
import { WeddingfuncafterlogdetailComponent } from './weddingfuncafterlogdetail/weddingfuncafterlogdetail.component';
import { MessageforeventlogComponent } from './messageforeventlog/messageforeventlog.component';
import { ReferafriendComponent } from './referafriend/referafriend.component';
import { WrirereviewpopComponent } from './wrirereviewpop/wrirereviewpop.component';
import { ModalComponent } from "src/app/shared/modal/modal.component";
import { OwlModule } from 'ngx-owl-carousel';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { DataService } from '../testing/data.service';;
import { ShareButtonModule } from '@ngx-share/button';
import { LiveofferdataComponent } from './liveofferdata/liveofferdata.component';
import { RedeembuttonComponent } from './redeembutton/redeembutton.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
@NgModule({
  declarations: [
    ClubwebComponent,
    HomepageComponent,
    ClubheaderComponent,
    ClubheaderHomeComponent,
    WebfooterComponent,
    VenuesComponent,
    VenuedetailsComponent,
    EventsComponent,
    EventsdetailComponent,
    ButticketsComponent,
    TicketsdetailsshwComponent,
    LiveofferComponent,
    RedeemofferComponent,
    RulesofuseComponent,
    SigninComponent,
    ForgetpasswordComponent,
    VerifyscreenComponent,
    ChangepasswordComponent,
    HelpsupportComponent,
    AboutusComponent,
    FavouritesComponent,
    SidebaraccountComponent,
    PersonalinfoeditComponent,
    VerifyyouridComponent,
    PurchasehistoryComponent,
    ListvenueComponent,
    FeedbackusrComponent,
    AboutjbclubComponent,
    TermsconditionComponent,
    HistoryDetailsComponent,
    WeddingfunctioneventComponent,
    WeddingfuncafterlogdetailComponent,
    MessageforeventlogComponent,
    ReferafriendComponent,
    WrirereviewpopComponent,
    ClubAndBarComponent,
    OtherTilesComponent,
    NewsSubscribeComponent,
    ModalComponent,
    PrivacypolicyComponent,
    LiveofferdataComponent,
    RedeembuttonComponent,
    
  ],
  imports: [
    CommonModule,
    ClubwebRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTableModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    OwlModule,
    ShareButtonModule,
    CarouselModule,
    NgxMaterialTimepickerModule
  ],
  providers: [CookieService, DataService],
  entryComponents: [
    ModalComponent,
    
  ]
})
export class ClubwebModule { }
