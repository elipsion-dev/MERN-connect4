import './App.css';
import React from 'react';
import Board from './components/Board';
import Button from './components/Button';
import Banner from './components/Banner';
import LoadScreen from './components/Loadscreen';
import SaveScreen from './components/Savescreen';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      //Rows and Columns are used to track & change the background color of each slot component
      rows: [
        new Array(7).fill(''),
        new Array(7).fill(''),
        new Array(7).fill(''),
        new Array(7).fill(''),
        new Array(7).fill(''),
        new Array(7).fill('')
      ],
      columns: [
        new Array(6).fill(''),
        new Array(6).fill(''),
        new Array(6).fill(''),
        new Array(6).fill(''),
        new Array(6).fill(''),
        new Array(6).fill(''),
        new Array(6).fill('')
      ],
      loads: [],
      winner: false,
      warning: false,
      loadScreen: false,
      saveScreen: false,
      nextPlayer: 'yellow',
      banner: 'React Connect 4'
    }
    //These functions are passed down to componenets so (this) must be bound
    this.saved = this.saved.bind(this);
    this.loadGame = this.loadGame.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.backToGame = this.backToGame.bind(this);
    this.deleteSave = this.deleteSave.bind(this);
    this.specificGameLoad = this.specificGameLoad.bind(this);
  }

  check4Winner() {
    //Arrays used to check for wins in each direction
    let strips = {
      h: [],                      //Horizontal
      v: new Array(7).fill(''),   //Vertical
      f: new Array(12).fill(''),  //Forward Diagonal
      b: new Array(12).fill('')   //Backward Diagonal
    }

    //Looping through the state.rows array and populating the arrays above for the check below
    this.state.rows.forEach((row, ri) => {
      let strip = '';
      row.forEach((cell, ci) => {
        let color = cell === 'red' ? 'red' : cell === 'yellow' ? 'yellow' : ' '
        strips.b[ci - ri + this.state.rows.length - 1] += color;
        strips.f[ci + ri] += color;
        strips.v[ci] += color;
        strip += color;
      });
      strips.h.push(strip);
    });

    // Now that the strips object's arrays are populated we can easily check them for a win
    for (let dir in strips) {
      strips[dir].forEach((s) => {
        const rslt = /(?:(red){4}|(yellow){4})/.exec(s);
        if (rslt) {
          this.setState({ winner: (rslt[1] || rslt[2]).toUpperCase(), banner: (rslt[1] || rslt[2]).toUpperCase() + ' WINS!!' })
          return true;
        }
        return false;
      });
    }
  }


  //Main Click Handler for the game board
  handleClick(column) {
    const columnsCopy = [...this.state.columns]
    const rowsCopy = [...this.state.rows]
    let stateCopy = { ...this.state }

    if (!this.state.winner || this.state.winner === 'false') {
      //This is the start of Red's turn
      if (this.state.nextPlayer === 'yellow') {
        //As long as the top slot is blank we can drop in this column
        if (columnsCopy[column][0] === '') {
          //The loop which drops the checker to the lowest slot available
          for (let j = 0; j < columnsCopy[column].length; j++) {
            //Loop through until we find one that isn't blank
            if (columnsCopy[column][j] !== '') {
              //Assign the one above that one to 'red'
              columnsCopy[column][j - 1] = 'red';
              //Assign corresponding slot in rows to 'red'
              rowsCopy[j - 1][column] = 'red'
              //  Ready, Set,
              break;
            }
            //If you never found an assigned slot - make the very bottom slot 'red'
            else if (j === columnsCopy[column].length - 1) {
              columnsCopy[column][j] = 'red';
              rowsCopy[j][column] = 'red'
            }
          }
          this.setState({ ...stateCopy, columns: columnsCopy, rows: rowsCopy, nextPlayer: 'red' })
        }
      }

      //Else would mean it's yellow's turn - all this is the same as above
      else {
        if (columnsCopy[column][0] === '') {
          for (let j = 0; j < columnsCopy[column].length; j++) {
            if (columnsCopy[column][j] !== '') {
              if ((j - 1) > -1) {
                columnsCopy[column][j - 1] = 'yellow';
                rowsCopy[j - 1][column] = 'yellow'
                break;
              }
            } else if (j === columnsCopy[column].length - 1) {
              columnsCopy[column][j] = 'yellow';
              rowsCopy[j][column] = 'yellow'
            }
          }
          this.setState({ ...stateCopy, columns: columnsCopy, rows: rowsCopy, nextPlayer: 'yellow' })
        }
      }
      //After the turn is complete - check to see if this resulted in a winner
      this.check4Winner(this.state)
    }
  }

  resetGame() {
    let newState = {
      rows: [
        new Array(7).fill(''),
        new Array(7).fill(''),
        new Array(7).fill(''),
        new Array(7).fill(''),
        new Array(7).fill(''),
        new Array(7).fill('')
      ],
      columns: [
        new Array(6).fill(''),
        new Array(6).fill(''),
        new Array(6).fill(''),
        new Array(6).fill(''),
        new Array(6).fill(''),
        new Array(6).fill(''),
        new Array(6).fill('')
      ],
      loads: [],
      winner: false,
      warning: false,
      loadScreen: false,
      saveScreen: false,
      nextPlayer: 'yellow',
      banner: 'React Connect 4'
    }
    this.setState(newState)
  }


  //Pressing the 'Save Game' button updates state to show save game screen
  saveGame() {
    this.setState({ saveScreen: true, winner: false, banner: 'React Connect 4' })
  }

  //When you input a name for your game save and press 'Save' button
  saved(saveName, stateCopy) {
    let data = { ...stateCopy, name: saveName, saveScreen: false }
    //Check to make sure this name isn't already taken
    fetch(`/checkName/${saveName}`, { method: 'GET' })
      .then(res => res = res.json())
      .then(res => {
        //If res.length is 0, then the name entered isn't already taken
        if (res.length === 0) {
          //Since the name check went ok, go ahead with the save
          fetch('/saveGame', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }
        //Else would mean the name entered was already taken
        else {
          this.setState({ ...stateCopy, warning: true, saveScreen: true })
        }
      })
  }

  //When you press 'Load Game' button
  loadGame() {
    //Changes the banner & winner variables back to default incase winner was true --> style related
    this.setState({ banner: 'React Connect 4', winner: false })
    let loadArr = []
    //Fetch all the saves
    fetch('/loadSaves')
      .then(load => load.json())
      .then(data => {
        //Then loop through them and push them into the empty loadArr
        data.forEach(save => {
          //This array is used in the render to place a button on the load screen for each saved game
          loadArr.push(save.name)
        })
      })
      //After the array is populated - we can now open the loadScreen
      .then(() =>
        this.setState({
          loads: loadArr,
          loadScreen: true
        })
      )
  }

  //When you press the 'X' button next to any saved game on the loadScreen
  deleteSave(e) {
    fetch(`/delete/${e.target.id}`)
      .then(this.loadGame())
  }

  //When you press any saved game button on the loadScreen
  specificGameLoad(e) {
    fetch(`/checkName/${e.target.id}`, { method: 'GET' })
      .then(res => res = res.json())
      .then(res => {
        let newState = res[0]
        this.setState({...newState, winner: newState.winner === 'false' ? false : newState.winner})
      })
      
  }

  //When you press the 'X' button on the loadScreen or saveScreen
  backToGame() {
    let stateCopy = { ...this.state }
    //Edit the state copy so the loadScreen and saveScreen are closed & the warning is gone
    this.setState({
      ...stateCopy,
      loadScreen: false,
      saveScreen: false,
      warning: false,
    })
    //Winner is made false on the save and load screens - so do check again
    this.check4Winner()
  }

  render() {
    const boardProps = {
      clickHandler: (column) => this.handleClick(column),
      rows: this.state.rows,
      columns: this.state.columns
    }
    const loadScreenProps = {
      backToGame: this.backToGame,
      specificGameLoad: this.specificGameLoad,
      deleteSave: this.deleteSave,
      loads: this.state.loads
    }
    const saveScreenProps = {
      saved: this.saved,
      backToGame: this.backToGame,
      warning: this.state.warning,
      stateCopy: { ...this.state }
    }

    return ( //--> Of The Mack

      <div className={'text-center text-white'}>

        <Banner text={this.state.banner} style={this.state.winner ? 'winner' : 'banner'} bg={this.state.winner && this.state.winner} />

        {this.state.loadScreen ? <LoadScreen {...loadScreenProps} /> :
          this.state.saveScreen ? <SaveScreen {...saveScreenProps} /> :
            <table>
              <Board {...boardProps} />
            </table>
        }

        {!this.state.loadScreen && !this.state.saveScreen &&
          <div className={'btn-group mt-1'}>
            <Button onClick={this.resetGame} bootstrap={'btn-danger rounded mb-4'} name={'Reset Game'} />
            <Button onClick={this.loadGame} bootstrap={'btn-warning rounded ml-5 mb-4'} name={'Load Game'} />
            <Button onClick={this.saveGame} bootstrap={'btn-success rounded ml-5 mb-4'} name={'Save Game'} />
          </div>
        }

      </div>

    );
  }
}
export default Game;