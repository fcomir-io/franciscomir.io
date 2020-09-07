// React libraries
import React from "react"
// CSS
import "./collapsible.scss"

class Collapsible extends React.Component {
  constructor(props) {
    super(props)
    //console.log("props in Collapsible:", props)
    this.state = {
      open: props.open,
    }
    this.togglePanel = this.togglePanel.bind(this)
  }
  togglePanel(e) {
    this.setState({ open: !this.state.open })
  }
  render() {
    return (
      <div>
        <div onClick={e => this.togglePanel(e)} className="collapsible-header">
          <h1>{this.props.title}</h1>
          <div className="icon"> {this.state.open ? "-" : "+"}</div>
        </div>
        {this.state.open ? (
          <div className="content">{this.props.children}</div>
        ) : null}
      </div>
    )
  }
}

export default Collapsible
