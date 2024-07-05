var questions = [
{
	question: "question 1: 2+2=?",
	answers: {
		1: '0',
		2: '2',
		3: '4',
		4: '7'
	},
	rightAnswer: '3'
},
{
	question: "question 2: 3/3=?",
	answers: {
		1: '1',
		2: '3',
		3: '0',
		4: '6'
	},
	rightAnswer: '1'
},
{
	question: "question 3: 4*4=?",
	answers: {
		1: '2',
		2: '8',
		3: '4',
		4: '16'
	},
	rightAnswer: '4'
},
{
	question: "question 4: 7*5*3=?",
	answers: {
		1: '172',
		2: '105',
		3: '286',
		4: '373'
	},
	rightAnswer: '2'
}
]

var testContainer = document.getElementById("test");
var resultButton = document.getElementById("resultButton");
var resultContainer = document.getElementById("results");

generateTest(questions, testContainer, resultContainer, resultButton);


function generateTest(questions, testContainer, resultContainer, resultButton) {
	function showQuestions(questions, testContainer) {
		var out = [];
		var answers;
		
		for (var i=0; i < questions.length; i++){
			answers = [];
			for (var ans_text in questions[i].answers){
				answers.push(
						'<label><br><input type="radio" name="question' + i + '"value="' + ans_text + '">' + ans_text + ') '
						+ questions[i].answers[ans_text] + '</label>'
					);
			}
			out.push('<div class="questions">' + questions[i].question + '</div>' +
				'<div class="answers">' + answers.join('') + '</div>'
				);
		}
		testContainer.innerHTML = out.join("");
	}
	
	function showResults(question, testContainer, resultContainer){
		var answerContainers = testContainer.querySelectorAll('.answers');
		
		var userAnswers = '';
		var rightAnswerNum = 0;
		
		for (var i=0; i < questions.length; i++){
			userAnswers = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;
			
			if (userAnswers == questions[i].rightAnswer){
				answerContainers[i].style.color = 'green';
				rightAnswerNum++;
			} else {
				answerContainers[i].style.color = 'red';
			}
		}
		
		var resultStr;
		
		if (rightAnswerNum == 0) {
			resultStr = 'Now i send your score to your parents, too bad';
		} else if (rightAnswerNum == 1) {
			resultStr = 'Go learn some math';
		} else if (rightAnswerNum == 2) {
			resultStr = '50/50';
		} else if (rightAnswerNum == 3) {
			resultStr = 'Well done, but not enough';
		} else if (rightAnswerNum == 4) {
			resultStr = 'Good, now you can go to Oxford university';
		}
		
		resultContainer.innerHTML = resultStr;
		
	}
	
	showQuestions(questions, testContainer);
	
	resultButton.onclick = function(){
		showResults(questions, testContainer, resultContainer);
	}
}

