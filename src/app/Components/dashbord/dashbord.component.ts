import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { AuthService } from '../../Services/auth.service';
import { UserStoreService } from '../../Services/user-store.service';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'] 
})

export class DashbordComponent implements OnInit {

  public users: any = [];
  public firstname: string="" ;
  public role!: string;
  userId !: number;
  editMode: boolean = false;
  selectedUser: any = null;
  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService, private toast:NgToastService , private router:Router)  { }

  ngOnInit(){
    this.api.getUsers().subscribe((res: any[]) => {
      console.log('API Response:', res);
      this.users = res;
    });

      this.userStore.getFullNameFromStore()
      .subscribe(val => {
        const fullNameFromToken = this.auth.getfullNameFromToken();
        console.log('FullName from Token:', fullNameFromToken);
        console.log('FullName from Store:', val);
        this.firstname = val || fullNameFromToken;
        console.log('Firstname set to:', this.firstname);
      });

    this.userStore.getRoleFromStore()
      .subscribe(val=> {
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      });
  }
  getUsers(): void {
    this.api.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  
  logout() {
    this.auth.signOut();
  }

  setUserIdToDelete(userId: number): void {
    this.userId = userId;
  }

  DeleteUser(userId: number): void {
    this.api.deleteUser(userId).subscribe(
      response => {
        console.log('API Response:', response);
        this.toast.success('Deleted Successfully', 'User has been deleted', 5000);
        this.getUsers();  
      },
      error => {
        console.error('Error deleting user', error);
        this.toast.danger('Error deleting user', 'An error occurred while deleting the user', 50000);
      }
    );
  }
  editUser(user: any): void {
    this.selectedUser = user;
    this.editMode = true;
  }
  onSaveChanges(updatedUser: any): void {
    this.api.updateUser(updatedUser.id, updatedUser).subscribe(() => {
      this.editMode = false;
      this.selectedUser = null;
      this.getUsers();
    });
  }

  cancelEdit(): void {
    this.editMode = false;
    this.selectedUser = null;
    this.getUsers();
  }
  navigateToRegister(): void {
    this.router.navigate(['/signup']); // Navigate to the register page
  }

}
