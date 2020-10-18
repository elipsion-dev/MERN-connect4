import React, {Component} from 'react';

class Input extends Component {

    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
    }

    submit(e) {
        e.preventDefault()
        const { _name } = this.refs
        let sendName = _name.value
        this.props.saved(sendName, this.props.stateCopy)
        _name.value = ''
        this.props.backToGame()
    }

    render() {
        return (
            <form onSubmit={this.submit} className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                                
                <div className="input-group">

                    <input
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    className={this.props.bootstrap}
                    ref="_name"
                    required
                    autoFocus
                    >
                    </input >

                    <span className="input-group-btn">
                        <button className="btn btn-success my-5" type="submit">Save</button>
                    </span>
                    
                </div>

            </form>
        );
    };
}

export default Input;