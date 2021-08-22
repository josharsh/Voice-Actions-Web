function VoiceActions(actionObject) {

  // Speech Recognition using the Browser APIs
  var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
  var SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
  var SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

  // Initialize Function
  const actionIdsCollection = actionObject.actionIds;
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();

  // Grammar is the text content of all the element received
  var grammar =
    "#JSGF V1.0; grammar phrase; public <phrase> = " +
    commandsCollection.join() +
    ";";
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // Contains all commands (What the user is supposed to say)
  const commandsCollection = actionIdsCollection.map((id) => {
    return document.getElementById(id).textContent.toLowerCase();
  });

  // Contains DOM elements as action items
  const domElementCollection = actionIdsCollection.map((id) => {
    return document.getElementById(id);
  });

  // Maps Voice Command to DOM element
  const textContentToElementMapper = new Map();
  for (let element of domElementCollection) {
    textContentToElementMapper.set(element.textContent.toLowerCase(), element);
  }

  // Click Event (Each New Speech Recognition instance begins with a click)
  document.body.onclick = function () {
    try {
      recognition.start();
    } catch (e) {
      console.log(e);
    }
  };

  // On Successful recognition
  recognition.onresult = function (event) {
    var speechResult = event.results[0][0].transcript.toLowerCase();
    if (commandsCollection.includes(speechResult)) {
      textContentToElementMapper.get(speechResult).click();
    } else {
      alert("Voice Action not found. Please Try again");
    }
  };
  recognition.onspeechend = function () {
    recognition.stop();
  };

  recognition.onnomatch = function (event) {
    alert("No Match Found. Please Try Again");
  };

  recognition.onerror = function (event) {
    alert("Some error occurred, Please try again later", event.error);
  };
}

export default VoiceActions;
