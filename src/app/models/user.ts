import { Injectable } from '@angular/core';

@Injectable()
export class User {

    public profile: any = null;

    constructor() {
    }

    getProfile() {
        return this.profile;
    }

    setProfile(profile: any) {
        if (profile) {
            this.profile = profile;

            if (this.profile.FirstName && this.profile.LastName) {
                this.profile.FullName = this.profile.FirstName + ' ' + this.profile.LastName;
            }
        } else {
            this.profile = null;
        }
    }
}
