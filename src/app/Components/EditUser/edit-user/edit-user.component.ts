import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../Services/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
 
  @Input() user: any = [];
  @Output() cancelEdit = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<any>();
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    this.saveChanges.emit(this.user);
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }

}
