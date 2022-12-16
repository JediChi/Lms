const prompt = require("prompt-sync")();
const fs = require("fs");
const users = require("./users");
const tutor = require("./tutor");
const courses = require("./courses");
const { log } = require("console");

class Students {
  constructor(email, password) {
    if (this.constructor === Students) {
      throw new Error("Students can not be instantiated");
    }
    this.email = email;
    this.password = password;
  }

  loggedIn = [];

  reviewsCart = [];

  welcomeMessage() {}
  payment() {}

  Login() {}
}

class Tutor extends Students {
  // #fullName;
  // #track;
  constructor(fullName, email, password, track) {
    super(email, password);
    this.fullName = fullName;
    this.track = track;
  }
  // registering the tutor
  static tutorRegister() {
    this.fullName = prompt("What is your full name? ");
    this.email = prompt("What is your email address? ");
    this.password = prompt("Please input your password? ");
    this.track = prompt(
      "Which course are you teaching? Backend, Frontend, web3 or product_design "
    );
    let confirmed = prompt("Are you done? y/n");
    if (confirmed == "y") {
      // pushing tutor's details to tutor.json file
      tutor.push({
        nameTutor: this.fullName,
        emailTutor: this.email,
        passwordTutor: this.password,
        tutorCourse: this.track,
      });
      // storing it in tutor.json file
      fs.writeFile(
        "./teachable_lms/tutor.json",
        JSON.stringify(tutor),
        (err) => {
          if (err) throw err;
          console.log(
            `Hello ${this.fullName}, your registration as a tutor was successful.`
          );
          const whatToDo = prompt(
            `What do you want to do? [1 => Upload Courses], [2 => View Reviews of Students] 1/2 `
          );
          // checking what the tutor wants to do
          if (whatToDo == "1") {
            Tutor.uploadCourses();
          } else if (whatToDo == "2") {
            console.log("This feature is coming soon");
          } else {
            console.log("Input error");
          }
        }
      );
    } else {
      console.log("Sorry!");
    }
  }
  // uploading courses
  static uploadCourses() {
    const nameOfCourse = prompt("What is the name of the course? ");
    const courseTrack = prompt("Under which track? ");
    const priceOfCourse = prompt("How much is the course");
    const newPriceOfCourse = parseInt(priceOfCourse);
    const done = prompt("Is that all? y/n");
    if (done == "y") {
      courses.push({
        courseName: nameOfCourse,
        courseTracks: courseTrack,
        coursePrice: newPriceOfCourse,
      });
      fs.writeFile(
        "./teachable_lms/courses.json",
        JSON.stringify(courses),
        (err) => {
          if (err) throw err;
          console.log("Upload successful");
          console.log(courses);
        }
      );
    } else {
      console.log("Upload failed");
    }
  }

  
}

const teach = new Tutor();

class Lms extends Students {
  constructor(email, password) {
    super(email, password);
    this.email = "Teachable";
    this.password = "learnable2022";
  }

  Description() {
    console.log(courses);
    const yourChoice = prompt("Input your selection based on the courseName: ");
    // storing details of selected courses to users.json file
    courses.forEach((element) => {
      if (yourChoice == element.courseName) {
        const addToCart = prompt("Do you want to add to cart? y/n");
        if (addToCart == "y") {
          users.forEach((el, id) => {
            if (el.fullName == users[0].fullName) {
              users[id] = { ...el, courseChosen: [courses[0]] };
            }
          });
          fs.writeFile(
            "./teachable_lms/users.json",
            JSON.stringify(users),
            (err) => {
              if (err) throw err;
              console.log("Successfully added to cart");
              news.payment();
            }
          );
        }
      } else {
        // console.log(
        //   "Sorry, that course is not available at the moment"
        // );
      }
    });
  }

  Faq() {
    console.log(
      "These are commonly asked questions with their answers: \n 1. How much is JavaScript course - 5000. \n 2. How much is Java - 4000"
    );
  }

  Support() {
    console.log(
      "Customer Care number: 0804567834 \n Customer Care email: support@gmail.com"
    );
  }
}

const admin = new Lms();

class NewStudents extends Students {
  constructor(firstName, lastName, email, password) {
    super(email, password);
    this.firstName = firstName;
    this.lastName = lastName;
  }
  welcomeMessage() {
    console.log(
      "Welcome to Teachable. This is an online learning platform. These are the various courses offered: Backend Development, Frontend Development, Web3 Development. \n Backend Development has to do with the server side and collection of database. \n Frontend Development has to do the client side and certain functionalities.  \n Web3 Development has to do with blockchain technology."
    );

    const userInput = prompt(
      "Do you want to: 1 => Login, 2 => Register, 3 => View FAQ, 4 => Contact Support "
    );
    if (userInput.length > 0) {
      this.userInputChoice(userInput);
    }
  }

  userInputChoice = (choice) => {
    switch (choice) {
      case "1":
        news.Login();
        break;
      case "2":
        news.Register();
        break;
      case "3":
        admin.Faq();
        break;
      case "4":
        admin.Support();
        break;

      default:
        break;
    }
  };

  Register() {
    const typeOfUser = prompt(
      "Are you registering as a [1 => Student] or [2 => Tutor] "
    );
    if (typeOfUser === "1") {
      this.firstName = prompt("What is your first name? ");
      this.lastName = prompt("What is your last name? ");
      this.email = prompt("What is your email address? ");
      this.password = prompt("What is your password? ");
      // pushing to users.json file
      users.push({
        fullName: this.firstName + " " + this.lastName,
        emailAddress: this.email,
        mainPassword: this.password,
        courseChosen: [],
      });
      // storing students data in the users.json file
      fs.writeFile(
        "./teachable_lms/users.json",
        JSON.stringify(users),
        (err) => {
          if (err) throw err;
          console.log(`${this.firstName}, your registration was successful`);
          const whereTo = prompt(
            "What do you want to do? \n [1 => Courses & Payment], [2 => FAQ], [3 => Contact support] "
          );
          if (whereTo === "1") {
            admin.Description();
          } else if (whereTo === "2") {
            admin.Faq();
          } else if (whereTo === "3") {
            admin.Support();
          } else {
            console.log("Thank you!");
          }
        }
      );
    } else if (typeOfUser === "2") {
      Tutor.tutorRegister();
    } else {
      console.log("Please input the correct details.");
    }
  }

  Login() {
    const registeredFullName = prompt("Enter registered name(i.e your first name and last name while registering): ");
    const registerdPassword = prompt("Enter registered password: ");

    users.forEach((ele, id) => {
      if (
        ele.fullName === registeredFullName &&
        ele.mainPassword === registerdPassword
      ) {
        this.loggedIn.push(ele);
      }
    });
    if (this.loggedIn.length > 0) {
      console.log("You are logged in");
      fs.writeFile(
        "./teachable_lms/users.json",
        JSON.stringify(users),
        (err) => {
          if (err) throw err;
          const whereTo = prompt(
            "What do you want to do? \n [1 => Courses & Payment], [2 => FAQ], [3 => Contact support] "
          );
          if (whereTo === "1") {
            admin.Description();
          } else if (whereTo === "2") {
            admin.Faq();
          } else if (whereTo === "3") {
            admin.Support();
          } else {
            console.log("Incorrect option");
          }
        }
      );
    } else {
      console.log("Incorrect details");
    }
  }

  payment() {
    const payChoice = prompt("Do you want to pay? y/n");
    if (payChoice == "y") {
      console.log(`Your payment was successful. You can now start learning!`);
      news.learning();
    } else {
      console.log("Payment denied");
    }
  }

  learning() {
    const whatToDo = prompt("Do you want to start watching the learning videos? y/n ");
    if (whatToDo == 'y') {
      console.log("your video is playing");
      news.reviews();
    } else {
      news.reviews();
    }
  }

  reviews() {
    const reviews = prompt("Do you want to leave a review? y/n ");
    if (reviews == 'y') {
      const leaveReviews = prompt("Enter your reviews here: ");
      this.reviewsCart.push(leaveReviews);
    } else {
      console.log("Thanks for watching.");
    }
  }
}



const news = new NewStudents();
news.welcomeMessage();
