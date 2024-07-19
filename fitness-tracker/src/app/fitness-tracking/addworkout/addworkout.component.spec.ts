import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule , FormBuilder} from '@angular/forms';
import { AddworkoutComponent } from './addworkout.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';



describe('AddworkoutComponent', () => {
  let component: AddworkoutComponent;
  let fixture: ComponentFixture<AddworkoutComponent>;
  let router: Router;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddworkoutComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddworkoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.workoutForm.value).toEqual({
      month: '',
      workoutType: '',
      name: '',
      workoutMinutes: ''
    });
  });

  it('should add new workout on form submission', () => {
    // Arrange
    const initialWorkoutsCount = component.getWorkoutsForMonth('January').length;
    const newWorkout = {
      month: 'January',
      workoutType: 'Cardio',
      name: 'New User',
      workoutMinutes: 45
    };
    component.workoutForm.setValue(newWorkout);

    // Act
    component.onSubmit();
    fixture.detectChanges(); // Ensure changes are reflected

    // Assert
    const updatedWorkouts = component.getWorkoutsForMonth('January');
    expect(updatedWorkouts.length).toBe(initialWorkoutsCount + 1);
    expect(updatedWorkouts.some(workout => workout.name === 'New User')).toBeTrue();
  });

  it('should not add new workout if form is invalid', () => {
    // Arrange
    const initialWorkoutsCount = component.getWorkoutsForMonth('January').length;
    component.workoutForm.setValue({
      month: '',
      workoutType: '',
      name: '',
      workoutMinutes: ''
    });

    // Act
    component.onSubmit();
    fixture.detectChanges(); // Ensure changes are reflected

    // Assert
    const updatedWorkouts = component.getWorkoutsForMonth('January');
    expect(updatedWorkouts.length).toBe(initialWorkoutsCount);
  });

  it('should call saveForm on save button click', () => {
    spyOn(component, 'saveForm'); // Spy on saveForm method
    fixture.detectChanges(); // Ensure the component is up-to-date

    // Find the save button
    const saveButton = de.query(By.css('button.btn-primary:nth-of-type(2)'));
    if (saveButton) { // Check if saveButton is found
      saveButton.nativeElement.click();
      expect(component.saveForm).toHaveBeenCalled();
    } else {
      fail('Save button not found');
    }
  });

  it('should navigate back on back button click', () => {
    spyOn(router, 'navigate'); // Spy on router.navigate
    fixture.detectChanges(); // Ensure the component is up-to-date

    // Find the back button
    const backButton = de.query(By.css('button.btn-primary:nth-of-type(1)'));
    if (backButton) { // Check if backButton is found
      backButton.nativeElement.click();
      expect(router.navigate).toHaveBeenCalledWith(['/fitness-tracking/dashboard']);
    } else {
      fail('Back button not found');
    }
  });

  it('should calculate total workout minutes correctly', () => {
    // Arrange
    const expectedTotalMinutes = component.januaryWorkouts.reduce((sum, workout) => sum + workout.workoutMinutes, 0);

    // Act
    const totalMinutes = component.calculateTotalWorkoutMinutes('January');

    // Assert
    expect(totalMinutes).toBe(expectedTotalMinutes);
  });

  it('should handle empty month selection gracefully', () => {
    // Arrange
    component.selectedMonth = '';
    fixture.detectChanges();

    // Act
    const totalMinutes = component.calculateTotalWorkoutMinutes(component.selectedMonth);

    // Assert
    expect(totalMinutes).toBe(0);
  });

  it('should handle form change correctly', () => {
    // Arrange
    const event = { target: { value: 'February' } };

    // Act
    component.onChange(event);

    // Assert
    expect(component.selectedMonth).toBe('February');
    expect(component.monthSelected).toBeTrue();
    expect(component.getFilteredWorkouts().length).toBe(component.februaryWorkouts.length);
  });

  it('should return empty array for unknown month', () => {
    // Act
    const workouts = component.getWorkoutsForMonth('Unknown');

    // Assert
    expect(workouts).toEqual([]);
  });
});