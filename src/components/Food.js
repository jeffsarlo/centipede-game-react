import React from 'react'
// import '../img/fly.png'

const Food = (props) => {

  const style = {
    left: `${props.food[0]}%`,
    top: `${props.food[1]}%`
  }


  return (
    <div className="food" style={style}>
      
    </div>
  )
}

export default Food
