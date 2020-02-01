import React, { Component } from 'react'
import Snake from './Snake'
import Food from './Food'
import ControlPanel from './ControlPanel'



const getRandomCoordinates = () => {
  let min = 1
  let max = 98
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2
  return [x,y]
}

const initialState = {
  message: 'Play Again?',
  direction: 'RIGHT',
  speed: 200,
  food: getRandomCoordinates(),
  snakeDots: [
    [0,0],
    [2,0]
  ],
}

// GAMEBOARD COMPONENT
class GameBoard extends Component {

  state = initialState


  componentDidMount() {
    document.onkeydown = this.onKeyDown
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders()
    this.checkIfCollapsed()
    this.checkIfEat()
  }

  playButton = () => {
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.moveSnake, this.state.speed)
    this.setState({
      message: "Let's Go!"
    })
  }

  pauseButton = () => {
    clearInterval(this.intervalId)
    this.setState({
      message: "Paused"
    })
  }

  newGameButton = () => {
    clearInterval(this.intervalId)
    this.setState(initialState)
  }


  onKeyDown = (e) => {
    e = e || window.event;
    switch(e.keyCode) {
      case 38:
        this.setState({ direction: 'UP'})
        break
      case 40:
        this.setState({ direction: 'DOWN'})
        break
      case 37:
        this.setState({ direction: 'LEFT'})
        break
      case 39:
        this.setState({ direction: 'RIGHT'})
        break
      default:
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        break
      case 'LEFT':
        head = [head[0] - 2, head[1]]
        break
      case 'UP':
        head = [head[0], head[1] - 2]
        break
      case 'DOWN':
        head = [head[0], head[1] + 2]
        break
      default:
    }
    dots.push(head)
    dots.shift()
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutOfBorders = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver()
    }
  }

  checkIfCollapsed = () => {
    let snake = [...this.state.snakeDots]
    let head = snake[this.state.snakeDots.length - 1]
    snake.pop()
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver()
      }
    })
  }

  checkIfEat = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    let food = this.state.food
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.growSnake()
      this.increaseSpeed()
    }
  }

  growSnake = () => {
    let newSnake = [...this.state.snakeDots]
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake,
      message: newSnake.length - 2
    })
  }

  increaseSpeed = () =>  {
    let speed = this.state.speed

    if (this.state.speed > 10) {
      speed -= 10
      this.setState({
        speed
      })
    }
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.moveSnake, speed)
  }

  onGameOver = () => {
    let snakeLength = this.state.snakeDots.length
    // this.messageHandler(`Game Over!! Your snake was ${this.state.snakeDots.length}ft. long!`)
    clearInterval(this.intervalId)
    // this.setState(initialState)
    this.setState({
      message: "Game Over",
      direction: 'RIGHT',
      speed: 200,
      food: getRandomCoordinates(),
      snakeDots: [
        [0,0],
        [2,0]
      ],
    })

    setTimeout( () => {
      this.messageHandler(`${snakeLength - 2} flys eaten!`)
    },2000)
  }

  messageHandler = (msg) => {
    this.setState({
      message: msg
    })
  }

  render () {
    return (
      <div className="console-container">
        <div className="game-area">
          <Snake snakeDots={ this.state.snakeDots } />
          <Food food={ this.state.food } />
        </div>
        <ControlPanel
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          newGameButton={this.newGameButton}
          message={this.state.message}
        />
      </div>
    )
  }
}

export default GameBoard


// { `Score: ${this.state.message}`}
