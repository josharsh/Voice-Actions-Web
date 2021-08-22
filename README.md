# Voice-Actions-Web
Navigate your web app with your voice
# Install
```bash
npm i voice-actions-web
```
# How to use
```js
import VoiceActions from 'VoiceActions';
// In App.js
VoiceActions("button1Id", "button2id");
```
# Examples
### 1
```js
function Button(){
  return(
    <button id="click2" onClick={()=>{
      VoiceActions({"actionIds":["click","click2","click4","click5","click6"]})
    }}>Let me try this</button>
  )
}
// Add Buttons with IDs here
```
### 2 
```js
function App() {
  VoiceActions({"actionIds":["click","click2"]})
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    <button id="click">Go to Home </button>
    <button id="click2"> Go to About </button>
    </div>
```

# When does Voice command identification start?
You can configure it to any event to start for the first time (using VoiceActions function). Post that every mouse click would result into a voice command identification.