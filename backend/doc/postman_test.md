# Postman test log

| Feature  | Route | HTTP Method | Outcome | Comments |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| Sign in  | /  | POST  | Passed  | Return with a token  |
| Create User | /users  | POST  | Passed  | No issue  |
| View all users  | /users | GET  | Passed  | No issue |
| View user by ID  | /users/:userid  | GET  | Passed  | No issue  |
| Edit User  | /users/:userid  | PUT  | Passed  | No issue |
| Change Password  | /users/:userid/password  | PUT  | Passed  | No issue |
| Delete User  | /users/:userid  | DELETE  | Passed  | No issue |
| Create new Patient  | /paitents  | POST  | Passed  | No issue |
| View all Patients  | /paitents  | GET  | Passed  | No issue |
| View Patient by id  | /paitents/:paitentid  | GET  | Passed  | No issue |
| Edit Patient  | /paitents/:paitentid  | PUT  | Passed  | No issue  |
| Delete Patient  | /paitents/:paitentid  | DELETE  | Passed  | No issue |
| Create new Appointment  | /appointments  | POST  | Passed  | No issue |
| View all Appointment  | /appointments  | GET  | Passed  | No issue |
| View Appointment by id  | /appointments/:appointmentid  | GET  | Passed | No issue  | 
| Edit Appointment  | /appointments/:appointmentid  | PUT  | Passed  | No issue  |
| Delete Appointment  | /appointments/:appointmentid  | PUT  | Passed  | No issue  |

## Screenshots of postman

* Summary of routes
  
  ![Summary of routes](./postman_screenshot/SummaryofRoutes.jpg)

* Sign in
  
  ![Sign in](./postman_screenshot/Signin.jpg)

*  Create User
  
  ![ Create User](./postman_screenshot/CreateUser.jpg)  

* Get All Users

  ![Get All Users](./postman_screenshot/GetAllUsers.jpg)  

* Get User without Authorization
  
  ![Get User without Authorization](./postman_screenshot/GetUserwithoutAuthorization.jpg)

*  Get User By ID
  
  ![ Get User By ID](./postman_screenshot/GetUserByID.jpg)  

*  Edit User
  
  ![ Edit User](./postman_screenshot/EditUser.jpg)  

*  Change Password
  
  ![ Change Password](./postman_screenshot/ChangePassword.jpg)    

*  Delete User
  
  ![ Delete User](./postman_screenshot/DeleteUser.jpg)

*  Create Patient Exsited Email
  
  ![ Create Patient Exsited Email ](./postman_screenshot/CreatePatientwithExsitedEmail.jpg)    

*  Create Patient
  
  ![ Create Patient](./postman_screenshot/CreatePatient.jpg)  

* Get All Patients

  ![Get All Patients](./postman_screenshot/GetAllPatients.jpg)  


*  Get Patient By ID
  
  ![ Get Patient By ID](./postman_screenshot/GetPatientByID.jpg)  

*  Edit Patient
  
  ![ Edit Patient](./postman_screenshot/EditPatient.jpg)  

*  Delete Patient
  
  ![ Delete User](./postman_screenshot/DeletePatient.jpg)      

*  Create Appointment
  
  ![ Create Appointment](./postman_screenshot/CreateAppointment.jpg)  

* Get All Appointments

  ![Get All Appointments](./postman_screenshot/GetAllPatients.jpg)  


*  Get Appointment By ID
  
  ![ Get Appointment By ID](./postman_screenshot/GetAppointmentByID.jpg)  

*  Edit Appointments
  
  ![ Edit Appointments](./postman_screenshot/EditAppointment.jpg)  

*  Delete Appointments
  
  ![ Delete Appointments](./postman_screenshot/DeleteAppointment.jpg) 