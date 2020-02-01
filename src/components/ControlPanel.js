import React from 'react'

const ControlPanel = (props) => {

  return (
    <div className="control-panel">
      <div className="scoreboard"><p>{props.message}</p></div>
      <div className="game-title"><h1>Centipede</h1></div>
      <div className="scoreboard-image"></div>
      <div className="button-container">
        <button className="video-btn-play" onClick={props.playButton}>Play</button>
        <button className="video-btn-pause" onClick={props.pauseButton}>Pause</button>
        <button className="start-btn" onClick={props.newGameButton}>New Game</button>
      </div>
    </div>
  )
}

export default ControlPanel
