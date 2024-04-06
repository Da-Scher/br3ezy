import { Component, inject} from '@angular/core';
import { NgIf } from "@angular/common";
import { AuthService } from '../auth/auth.service';
import { StreamListing } from '../streamlisting';
import { ListingService } from '../listing.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  user: any;
  token: any;
  updateSuccess: boolean = false;
  updateFailure: boolean = false;
  streamId: number = 1; // the host streamId is always 1
  admin: boolean = false; // assume user does not have access
  adminForm: FormGroup; // Form to hold admin stream settings
  listingService = inject(ListingService); // use to grab stream info
  streamListing: StreamListing | undefined; // it's okay to be undefined. plz dont crash
  url = 'https://localhost:8000/api/stream'; // stream API url

  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router) {
    // init form to blank silences typescript complaints
    this.adminForm = this.fb.group({
      title: [''],
      description: [''],
      photo: ['']
    });
    // request stream from listing service by id, assign listing, update form
    this.listingService.getStreamListingById(1).then((streamListing: StreamListing | undefined)=> { 
      this.streamListing = streamListing;
      this.adminForm = this.fb.group({
        title: [streamListing?.title],
        description: [streamListing?.description],
        photo: [streamListing?.photo]
      });
    });

    // grab the token from local, identify the user, check admin
    this.token = localStorage.getItem("token");
    // assign user
    this.user = this.authService.getUser(this.token);
    // assign admin priv
    this.admin = this.authService.isAdmin(this.token); 
  }

  
  // admin check for showing admin settings on page
  isAdmin(): boolean {
    return this.admin;
  }

  // submit the form data for patching
  onSubmit() {
    // grab the form data
    const req = this.adminForm.value;
    // make the patch request, handle the result
    this.listingService.patchListingById(this.streamId, req).then((success: Boolean)=> {
      // let the good times roll,
      // update photo and print success
      // message to page
      if (success){
        this.updateSuccess = true;
        this.updateFailure = false;
        if(this.streamListing) 
          // update photo in case it changed
          this.streamListing.photo = req.photo
      }
      // bad times, warn user
      else {
        this.updateSuccess = false;
        this.updateFailure = true;
      }
    });

  }

}
