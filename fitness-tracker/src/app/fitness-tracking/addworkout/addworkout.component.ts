import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addworkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addworkout.component.html',
  styleUrl: './addworkout.component.scss'
})

export class AddworkoutComponent {

  workoutForm: any;
  selectedMonth: any;
  januaryWorkouts: any[] = [
    { name: 'John', workoutType: 'Cardio', workoutMinutes: 60 },
    { name: 'Doe', workoutType: 'Strength Training', workoutMinutes: 45 },
  ];
  februaryWorkouts: any[] = [
    { name: 'Jane', workoutType: 'Yoga', workoutMinutes: 30 },
    { name: 'Smith', workoutType: 'Cardio', workoutMinutes: 50 },
  ];
  marchWorkouts: any[] = [
    { name: 'Alice', workoutType: 'Strength Training', workoutMinutes: 40 },
    { name: 'Bob', workoutType: 'Yoga', workoutMinutes: 35 },
  ];
  monthSelected: boolean = false;

  constructor(public fb: FormBuilder, public router: Router) { 
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.workoutForm = this.fb.group({
      month: ['', Validators.required],
      workoutType: ['', Validators.required],
      name: ['', Validators.required],
      workoutMinutes: ['', Validators.required],
    });
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredWorkouts();
  }

  calculateTotalWorkoutMinutes(month: string): number {
    let totalMinutes = 0;
    for (const workout of this.getWorkoutsForMonth(month)) {
      totalMinutes += workout.workoutMinutes;
    }
    return totalMinutes;
  }

  getWorkoutsForMonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryWorkouts;
      case 'February':
        return this.februaryWorkouts;
      case 'March':
        return this.marchWorkouts;
      default:
        return [];
    }
  }

  getFilteredWorkouts() {
    let filteredWorkouts: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredWorkouts = [...this.januaryWorkouts];
        break;
      case 'February':
        filteredWorkouts = [...this.februaryWorkouts];
        break;
      case 'March':
        filteredWorkouts = [...this.marchWorkouts];
        break;
      default:
        break;
    }
    return filteredWorkouts;
  }

  onSubmit() {
    if (this.workoutForm.valid) {
      const newWorkout = this.workoutForm.value;
      switch (this.selectedMonth) {
        case 'January':
          this.januaryWorkouts.push(newWorkout);
          break;
        case 'February':
          this.februaryWorkouts.push(newWorkout);
          break;
        case 'March':
          this.marchWorkouts.push(newWorkout);
          break;
        default:
          break;
      }
      this.workoutForm.reset();
      this.workoutForm.patchValue({ month: '', workoutType: '', name: '', workoutMinutes: '' });
    }
  }

  saveForm() {
    console.log("Form saved!");
  }

  onBack() {
    this.router.navigate(['/fitness-tracking/dashboard']);
  }
}