import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';
@Injectable({
    providedIn: 'root'
})

export class UserProvider {
    user: UserModel
    constructor() {
        if (localStorage.getItem("jcu")) {
            const bytes = CryptoJS.AES.decrypt(localStorage.getItem("jcu"), localStorage.getItem('token'));
            this.user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        }

    }
}

export interface UserModel {
    _id: string,
    profilePicVerifiedStatus: boolean,
    idVerificationStatus: boolean,
    firstName: string,
    lastName: string,
    email: string,
    countryCode: string,
    mobileNumber: string,
    gender: string,
    age: string,
    profilePic: string,
    profileCompletePer: Number,
}