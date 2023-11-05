//!++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import express from "express";
const app = express();
const PORT = 5000;
const users = [
  {
    id: 1,
    name: "daniyal",
    email: "daniyal@gmail.com",
  },
  {
    id: 2,
    name: "Huzaifa",
    email: "huzaifa@gmail.com",
  },
];
app.use(express.json()); // Parse JSON request bodies
//!get
app.get("/user", (req, res) => {
  res.send(users);
});
//!Post
app.post("/user", (req, res) => {
  try {
    const { name, email } = req.body;
    if (name.trim()&& email.trim()) {
      users.push({ id: users.length + 1 , ...req.body });
      return res.status(200).send({ status: "200", message: "sucessfully posted" });
    }
    else{
      res.status(400).send({status : 400 ,message:"Email and name is required"})
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ status: 400, message: err.message });
  }
});
//!Delete
app.delete("/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex((value) => value.id === userId);
  if (userId !== -1) {
    users.splice(index, 1);
    res.send({ message: "sucessfully Delete" });
  } else {
    res.status(404).send({ message: "bed work" });
  }
});
//!Edit PUT
app.put("/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const index = users.findIndex((value) => value.id === userId);
  // users.splice(index,1,{id:userId,...req.body})
  if (index !== -1) {
    // users[index]={id:userId ,...req.body}
    users.splice(index, 1, { id: userId, ...req.body });
    res.send({ message: "successfully update" });
  } else {
    res.send({ messsage: "not bed work updated" });
  }
});
//listner
app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});

// what is app.post()
// Express.js ka app.post() method, HTTP POST requests ko handle karne ke liye use hota hai. POST requests typically client se server ki taraf data bhejne ke liye hoti hain, jaise ki forms submit karte waqt. Express.js ke app.post() method se aap server par aane wale POST requests ko handle kar sakte hain, aur client se data receive karke us data ko server par process kar sakte hain.

//?manual check your api
// fetch("http://localhost:8000/user", {
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     method: "POST",
//     body: JSON.stringify({ name: "smit", email: "daniyal@gmail.com" })
// })
// .then(res => console.log(res))
// .catch(err => console.log(err))

// fetch("http://localhost:5000/user", {
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     method: "PUT",
//     body: JSON.stringify({ name: "smit", email: "daniyal@gmail.com" })
// })
// .then(res=> res.json())
// .then(res => console.log(res))
// .catch(err => console.log(err))
