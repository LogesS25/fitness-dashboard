import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  //workout details
  PastWorkouts = ['Lat pull ups', 'Pushups', 'Deadlifting'];
  currentWorkout = 'Cycling & Swimming';

  //WorkoutExpenses
  lastMonthsExpense = ['January: Rs.800', 'February: Rs.1000', 'March: Rs.1200'];
  currentMonthExpense = 'Rs.1500';
 
  //Todo Trans
  todoTransactions = [
    { description: 'Cycling' },
    { description: 'Swimming' },
    { description: 'Maintain proper diet' },
    { description: 'Rest Well' }
  ];

 
  constructor(public router: Router) { }

  onIncome() {
    this.router.navigate(['/fitness-tracking/addworkout']);
  }
  onExpense() {
    this.router.navigate(['/fitness-tracking/expense']);
  }
  onTodo() {
    this.router.navigate(['/fitness-tracking/todo']);
  } 
  


}
