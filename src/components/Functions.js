export const check4Winner = (props) => {

    //Arrays used to check for wins in each direction
    let strips = {
      h: [],                      //Horizontal
      v: new Array(7).fill(''),   //Vertical
      f: new Array(12).fill(''),  //Forward Diagonal
      b: new Array(12).fill('')   //Backward Diagonal
    }

    //Looping through the state.rows array and populating the arrays above for the check below
    props.state.rows.forEach((row, ri) => {
      let strip = '';
      row.forEach((cell, ci) => {
        let color = cell === 'red' ? 'red' : cell === 'yellow' ? 'yellow' : ' '
        strips.b[ci - ri + App.state.rows.length - 1] += color;
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
          App.setState({ winner: (rslt[1] || rslt[2]).toUpperCase(), banner: (rslt[1] || rslt[2]).toUpperCase() + ' WINS!!' })
          return true;
        }
        return false;
      });
    }
  }