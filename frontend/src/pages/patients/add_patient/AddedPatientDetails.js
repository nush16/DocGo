// // ** React Imports
// import { useState } from "react";

// // ** MUI Imports
// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";

// const PatientDetails = () => {
//   // ** State

//   const onChange = (file) => {
//     const reader = new FileReader();
//     const { files } = file.target;
//     if (files && files.length !== 0) {
//       reader.readAsDataURL(files[0]);
//     }
//   };

//   return (
//     <CardContent>
//       <form>
//         <Grid container spacing={5}>
//           <Grid item xs={12} sm={2}>
//             <TextField
//               fullWidth
//               label="Title"
//               placeholder="Dr"
//               defaultValue="Dr"
//             />
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <TextField
//               fullWidth
//               label="First Name"
//               placeholder="John"
//               defaultValue="John"
//             />
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <TextField
//               fullWidth
//               label="Last Name"
//               placeholder="Doe"
//               defaultValue="Doe"
//             />
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <TextField
//               fullWidth
//               label="Preferred Name"
//               placeholder="John Doe"
//               defaultValue="John Doe"
//             />
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <TextField
//               fullWidth
//               label="Gender"
//               placeholder="Male"
//               defaultValue="Male"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               type="email"
//               label="Email"
//               placeholder="johnDoe@example.com"
//               defaultValue="johnDoe@example.com"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               type="Contact Number"
//               label="Contact Number"
//               placeholder="12345678"
//               defaultValue="12345678"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Notes"
//               placeholder="TBA"
//               defaultValue="TBA"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button variant="contained" sx={{ marginRight: 3.5 }}>
//               Add Patient
//             </Button>
//             <Button type="reset" variant="outlined" color="secondary">
//               Reset
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </CardContent>
//   );
// };

// export default PatientDetails;
