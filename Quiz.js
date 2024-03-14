// This function allows user to select a quiz categrory
//**********START**********
function selectOption() {
  document.getElementById("category").addEventListener("change", function () {
    let selected = this.value;
    buildApiUrl(selected);
  });
}
//**********END************

// This function builds a url to be sent to fetch data from a quiz api
//**********START**********
function buildApiUrl(selected) {
  let apiURL = "";
  if (selected == "General Knowledge") {
    apiURL = "https://opentdb.com/api.php?amount=10&category=9&type=boolean";
  } else if (selected == "Science & Nature") {
    apiURL = "https://opentdb.com/api.php?amount=10&category=17&type=boolean";
  } else if (selected == "Animals") {
    apiURL = "https://opentdb.com/api.php?amount=10&category=27&type=boolean";
  } else if (selected == "Books") {
    apiURL = "https://opentdb.com/api.php?amount=10&category=10&type=boolean";
  } else if (selected == "Sports"){
    apiURL = "https://opentdb.com/api.php?amount=10&category=21&type=boolean";
  } else if (selected == "Films"){
    apiURL = "https://opentdb.com/api.php?amount=10&category=11&type=boolean";
  } else if(selected == "Computers"){
    apiURL = "https://opentdb.com/api.php?amount=10&category=18&type=boolean";
  } else if (selected == "Mathematics"){
    apiURL = "https://opentdb.com/api.php?amount=10&category=19&type=boolean";
  } else if (selected == "Mythology"){
    apiURL = "https://opentdb.com/api.php?amount=10&category=20&type=boolean";
  } else if (selected == "Vehicles"){
    apiURL = "https://opentdb.com/api.php?amount=10&category=28&type=boolean";
  } else {
    window.alert("Please Choose an Option!");
  }
  let option = document.getElementById("category");
  if (option.value == selected) {
    option.setAttribute("disabled", "disabled");
  }
  fetchData(apiURL);
}
//**********END************

let question = [];
let answer = [];
// This function fetches data from the quiz api
//**********START**********
function fetchData(apiURL) {
  fetch(apiURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let list_r = data["results"];
      for (let i = 0; i < list_r.length; i++) {
        question.push(list_r[i]["question"]);
        answer.push(list_r[i]["correct_answer"]);
      }
      startQuiz(question, answer);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}
//**********END************

const questElement = document.getElementById("question");
const ansBtn = document.getElementById("ans-buttons");
const nextBtn = document.getElementById("next-btn");
let scoreTable = document.getElementById("scoretable")
let currQnIndx = 0;
let score = 0;

// This function starts the quiz
//**********START**********
function startQuiz(quest, ans) {
  currQnIndx = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQn(quest, ans);
}
//**********END************

// This function displays the final score
//**********START**********
function displayScore() {
  resetState();
  questElement.style.textAlign = "center";
  questElement.style.fontSize = "23px"
  if (score > 8){
    questElement.innerHTML = `${String.fromCodePoint(0x1F31F)}${String.fromCodePoint(0x1F44F)} Congrats! You scored ${score} out of ${question.length}`
  }else{
    questElement.innerHTML = `You scored ${score} out of ${question.length}`;
  }
  
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}
//**********END************

// This function handles next button functionality
//**********START**********
function handleNextQn(question, answer) {
  
  currQnIndx++;
  scoreTable.style.textAlign = "end"
  scoreTable.style.display = "block"
  scoreTable.innerHTML = `${score}/${currQnIndx}`
  if (currQnIndx < question.length) {
    showQn(question, answer);
  } else {
    displayScore();
  }
}
//**********END************

// This function shows the quiz question and answer choices
//**********START**********
function showQn(question, answer) {
  resetState();
  let currQn = question[currQnIndx];
  let qnNum = currQnIndx + 1;

  questElement.innerHTML = qnNum + "/"+ question.length+ ". " + currQn;
  const values = ["True", "False"];
  for (let i = 0; i < 2; i++) {
    const button = document.createElement("button");
    button.innerHTML = values[i];
    button.classList.add("btn");
    ansBtn.appendChild(button);
    button.style.display = "inline-flex";
    // button.style.textAlign = "center"; 
  }

  let ans = answer[currQnIndx];
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      let selectedAns = button.textContent;

      if (selectedAns === ans) {
        score++;
        button.classList.add("correct");
      } else {
        button.classList.add("incorrect");
      }
      Array.from(ansBtn.children).forEach((button) => {
        button.disabled = true;
      });

      nextBtn.style.display = "block";
    });
  });
}
//**********END************

/* Event listener for Next button. 
If the end of questions has reached, refresh the view 
or else go to the next question*/
//**********START**********
nextBtn.addEventListener("click", () => {
  if (currQnIndx < question.length) {
    handleNextQn(question, answer);
  } else {
    history.go(0);  
  }
});
//**********END************

//This function resets the current state
//**********START**********
function resetState() {
  nextBtn.style.display = "none";
  while (ansBtn.firstChild) {
    ansBtn.removeChild(ansBtn.firstChild);
  }
}
//**********END************

selectOption();
