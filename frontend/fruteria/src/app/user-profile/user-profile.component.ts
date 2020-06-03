import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  usuario;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getUser(this.tokenStorageService.getUser().username).subscribe((data:any) =>{
      this.usuario = data;
    });
  }

  textualdate(date){
    let shownDate = new Date(date);
    return shownDate.toDateString();
  }

}
