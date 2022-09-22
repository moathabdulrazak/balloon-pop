
// #region GAME LOGIC AND DATA
//data
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxsize = 300
let highestPopCount = 0
let currentPopCount = 0
let gameLength = 10000
let clockId = 0
let timeRemaining = 0
let currentPlayer = {}

//functions
function startGame() {
  document.getElementById("game-controls").classList.remove("hidden")
  document.getElementById("main-controls").classList.add("hidden")
  document.getElementById("scoreboard").classList.add("hidden")
  startClock()
  setTimeout(stopGame, gameLength)
}

function startClock() {
  timeRemaining = gameLength
  drawClock()
  clockId = setInterval(drawClock, 1000)
}
function stopClock() {
  clearInterval(clockId)
}


function drawClock() {
  let countDownElem = document.getElementById('countdown')
  countDownElem.innerText = (timeRemaining / 1000).toString()
  timeRemaining -= 1000
}



function inflate() {
  clickCount++
  height += inflationRate
  width += inflationRate

  if (height > maxsize) {
    console.log("pop the balloon")
    currentPopCount++
    height = 0
    width = 0
    document.getElementById("pop-sound").play()

  }

  draw()
}

function checkBalloonPop(){
  
}

function draw() {
  let balloonElement = document.getElementById("balloon")
  let clickCountElem = document.getElementById("click-count")
  let popCountElm = document.getElementById('pop-count')
  let highPopCountElm = document.getElementById('high-pop-count')
  let playerNameElm = document.getElementById('player-name')


  balloonElement.style.height = height + "px"
  balloonElement.style.width = width + "px"

  clickCountElem.innerText = clickCount.toString()
  popCountElm.innerText = currentPopCount.toString()
  highPopCountElm.innerText = currentPlayer.topScore.toString()

  playerNameElm.innerText = currentPlayer.name
}

function stopGame() {
  console.log("the game is over")

  document.getElementById("main-controls").classList.remove("hidden")
  document.getElementById("scoreboard").classList.remove("hidden")
  document.getElementById("game-controls").classList.add("hidden")

  clickCount = 0
  height = 120
  width = 100

if(currentPopCount > currentPlayer.topScore){
  currentPlayer.topScore = currentPopCount
  savePlayers()
}

currentPopCount = 0

  stopClock()
  draw()
  drawScoreboard()
}
//#endregion

let players = []
loadPlayers()

function setPlayer(event){
  event.preventDefault()
  let form= event.target

  let playerName = form.playerName.value

   currentPlayer = players.find(player => player.name == playerName)

  if(!currentPlayer){
    currentPlayer = {name: playerName, topScore: 0}
    players.push(currentPlayer)
    savePlayers()
  }


  
  form.reset()
  document.getElementById("game").classList.remove("hidden")
  form.classList.add("hidden")
  draw()
  drawScoreboard()
}

function changePlayer(){
  document.getElementById("player-form").classList.remove("hidden")
  document.getElementById("game").classList.add("hidden")
}
 
function savePlayers(){
  window.localStorage.setItem("players", JSON.stringify(players))
}
function loadPlayers(){
  let playersData = JSON.parse(window.localStorage.getItem("players"))
  if(!playersData){
    players = []
  }else{
    players = playersData
}
}


function drawScoreboard(){
  let template = ""

  players.sort((p1, p2) => p2.topScore - p1.topScore)

  players.forEach(player => {
    template += `
    <div class="d-flex space-between">
    <i class="fa fa-user"></i>
    ${player.name}
  </span>
  <span>score: ${player.topScore} </span>
</div>
</div>`
  })
  document.getElementById("players").innerHTML = template
}

function startAudioPlayer(){
  // @ts-ignore
  document.getElementById('audioplayer').play()
  document.body.onclick = null
}
drawScoreboard()