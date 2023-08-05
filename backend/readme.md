# T3A2 - B

## Installation of Backend 

**Step 1** -
Enter the backend folder from the terminal

```
cd backend
```

**Step 2** -
Create .env file in the root of the backend folder and add the below
```
DATABASE_URL= 
TOKEN_SECRET=
```

**Step 3** - 
Intall the packages
```
npm i
```

**Step 4** - 
To seed the data into the local database, enter the src folder

```
cd src
```

Then run

```
node seeds.js
```

**Step 4** - 
To start the database, get back into the root of the backend and run

```
npm run start-dev
```


## Installation of Frontend

**Step 1** -
Enter the frontend folder from the terminal

```
cd frontend
```

## Changes Made
 


## Testing  - Backend Locally

### Postman test log

| Feature  | Route | HTTP Method | Outcome | Comments |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| Sign in  | /  | POST  | Passed  | Return with a token  |
| Create User | /users  | POST  | Passed  | No issue  |
| View all users  | /users | GET  | Passed  | No issue |
| View user by ID  | /users/:userid  | GET  | Passed  | No issue  |
| Update User  | /users/:userid  | PUT  | Passed  | No issue |
| Change Password  | /users/:userid/password  | PUT  | Passed  | No issue |
| Delete User  | /users/:userid  | DELETE  | Passed  | No issue |
| Create new Patient  | /paitents  | POST  | Passed  | No issue |
| View all Patients  | /paitents  | GET  | Passed  | No issue |
| View Patient by id  | /paitents/:paitentid  | GET  | Passed  | No issue |
| Update Patient  | /paitents/:paitentid  | PUT  | Passed  | No issue  |
| Delete Patient  | /paitents/:paitentid  | DELETE  | Passed  | No issue |
| Create new Appointment  | /appointments  | POST  | Passed  | No issue |
| View all Appointment  | /appointments  | GET  | Passed  | No issue |
| View Appointment by id  | /appointments/:appointmentid  | GET  | Passed | No issue  | 
| Update Appointment  | /appointments/:appointmentid  | PUT  | Passed  | No issue  |
| Delete Appointment  | /appointments/:appointmentid  | PUT  | Passed  | No issue  |


### Summary of routes
  
![Summary of routes](./doc/postman_screenshot/SummaryofRoutes.jpg)

### Sign in
#### **Route**  
![routes](./doc/postman_screenshot/Signin/Route.png)


#### **Expected Output**  
Token for validation created

#### **Output** 

![Sign in](./doc/postman_screenshot/Signin/output.png)

### Create User
#### **Route**  
![route](./doc/postman_screenshot/Create_User/route.png)

#### **Input** 
![input](./doc/postman_screenshot/Create_User/input.png)

#### **Expected Output**  
A user is created with the below data

```
    {
        "email": "admre@example.com",
        "password": "fwerwerw",
        "first_name": "Addfere",
        "last_name": "User",
        "title": "Mr.",
        "isAdministrator": true,
        "isPractitioner": false
    }
```

#### **Output** 
![output](./doc/postman_screenshot/Create_User/output.png)

### Get All Users
#### **Route**  
![route](./doc/postman_screenshot/All_Users/route.png)

#### **Expected Output**  


#### **Output** 
![output](./doc/postman_screenshot/All_Users/output.png)

### Get User without Authorization
![route](./doc/postman_screenshot/GetUserwithoutAuthorization.jpg)

###  Get User By ID
#### **Route**  
![route](./doc/postman_screenshot/Get_one_user/route.png)


#### **Expected Output**  


#### **Output**   
![route](./doc/postman_screenshot/Get_one_user/output.png)

### Edit User
#### **Route**  
![route](./doc/postman_screenshot/Update_User/route.png)

#### **Input** 
![input](./doc/postman_screenshot/Update_User/input.png)

#### **Expected Output**  


#### **Output**  
![output](./doc/postman_screenshot/Update_User/output.png)

###  Change Password
![output](./doc/postman_screenshot/Change_Password/ChangePassword.jpg)


###  Delete User
#### **Route**  
![route](./doc/postman_screenshot/Delete_User/route.png)


#### **Expected Output**  


#### **Output** 
![output](./doc/postman_screenshot/Delete_User/output.png)

###  Create Patient Existing Email

#### **Output**   
![ Create Patient Exsited Email ](./doc/postman_screenshot/Old_patient/CreatePatientwithExsitedEmail.jpg)    

###  Create Patient
#### **Route**  
![route](./doc/postman_screenshot/Create_Patient/route.png)

#### **Input** 
![input](./doc/postman_screenshot/Create_Patient/input.png)

#### **Expected Output**  
```
{
    "title": "Mr.",
    "first_name": "John",
    "last_name": "Doe",
    "preferred_name": "Johnny",
    "dob": "1980-01-01T00:00:00.000Z",
    "email": "erere.erer@example.com",
    "phone": "1234567890",
    "note": "Allergic to penicillin"

}
```

#### **Output**   
![output](./doc/postman_screenshot/Create_Patient/output.png)

### Get All Patients
#### **Route**  
![route](./doc/postman_screenshot/All_Patients/route.png)  

#### **Expected Output**  
All patients will be shown

#### **Output** 
  ![Get All Patients](./doc/postman_screenshot/All_Patients/output.png)  


###  Get Patient By ID
#### **Route**  
![route](./doc/postman_screenshot/Get_one_patient/route.png)  


#### **Expected Output**  
The Patient with ID 64cdb8fa7b8baa42d6241 will be shown

#### **Output**   
![output](./doc/postman_screenshot/Get_one_patient/output.png)  

###  Edit Patient
#### **Route**  
![route](./doc/postman_screenshot/Update_Patient/route.png)  

#### **Input** 
![route](./doc/postman_screenshot/Update_Patient/input.png)  

#### **Expected Output**  
The first name will be replaced be replaced by Sally

```
{
    "_id": "64cdb8fa7b78b8baa42d6241",
    "title": "Mr.",
    "first_name": "sally",
    "last_name": "Doe",
    "preferred_name": "Johnny",
    "dob": "1980-01-01T00:00:00.000Z",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "note": "Allergic to penicillin",
    "__v": 0
}
```

#### **Output**   
![output](./doc/postman_screenshot/Update_Patient/output.png)  

### Delete Patient
#### **Route**  
![output](./doc/postman_screenshot/Delete_Patient/route.png) 

#### **Expected Output**  
A message will show that the patient is deleted

#### **Output**   
![output](./doc/postman_screenshot/Delete_Patient/output.png)      

###  Create Appointment
#### **Route**  
![ route](./doc/postman_screenshot/Create_Appointment/route.png)  

#### **Input** 
![ input](./doc/postman_screenshot/Create_Appointment/input.png) 

#### **Expected Output**  
An appointment will be created with this data

```
{
    "practitioner" : "64cdb8fb7b78b8baa42d624f",
    "type" : "Standard Appointment",
    "patient": "64cdb8fa7b78b8baa42d6241",
    "startTime":"2023-12-01T14:30:00.000Z",
    "endTime":"2023-12-01T15:30:00.000Z",
    "note": "Test"
}
```

#### **Output**  
![ output](./doc/postman_screenshot/Create_Appointment/output.png)  

### Get All Appointments
#### **Route**  
![route](./doc/postman_screenshot/Get_all_appointements/route.png)  

#### **Expected Output**  
A message will show the details of all the appointment 

#### **Output** 
![output](./doc/postman_screenshot/Get_all_appointements/output.png)  


###  Get Appointment By ID
#### **Route**  
![route](./doc/postman_screenshot/Get_one_appointment/route.png)  

#### **Expected Output**  
A message will show the details of the appointment 

#### **Output**   
![ output](./doc/postman_screenshot/Get_one_appointment/output.png)  

###  Edit Appointments
#### **Route**  
![ route](./doc/postman_screenshot/Update_Appointment/route.png)  

#### **Input** 
![ input](./doc/postman_screenshot/Update_Appointment/input.png)  

#### **Expected Output**  

#### **Output**   
![ output](./doc/postman_screenshot/Update_Appointment/output.png)  

###  Delete Appointments
#### **Route**  
![ route](./doc/postman_screenshot/Delete_Appointment/input.png) 

#### **Expected Output**  
A message will show that the appointment is deleted

#### **Output**  
![ output](./doc/postman_screenshot/Delete_Appointment/output.png) 

## Testing  - Frontend Locally


## Testing  - Deployment


## Libraries



## Project Management 
