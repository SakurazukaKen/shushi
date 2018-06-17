import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import {loginAction} from './Login.action'
import './Login.scss'

export interface ILoginPropTypes {
  submit: ({username,password}:{username:string, password:string}) => any
}
const initialState = {
  password: '',
  username: '',
}
type LoginPageState = Readonly<typeof initialState>

export class Login extends React.Component<ILoginPropTypes, LoginPageState> {
  readonly state:LoginPageState = initialState;
  constructor(props: ILoginPropTypes) {
    super(props);
  }
  handleUsernameChange = (e:React.FormEvent<HTMLInputElement>):void => {
    this.setState({username:e.currentTarget.value});
  }
  handlePasswordChange = (e:React.FormEvent<HTMLInputElement>):void => {
    this.setState({password:e.currentTarget.value});
  }
  handleSubmitClick = (e:React.FormEvent<HTMLButtonElement>):void => {
    const {username, password} = this.state;
    this.props.submit({username,password});
  }
  render() {
    const {username, password} = this.state;
    return <div className={'loginPage'}>
      <input type="text" value={username} onChange={this.handleUsernameChange} />
      <input type="password" value={password} onChange={this.handlePasswordChange}/>
      <button onClick={this.handleSubmitClick} >Login</button>
    </div>
  }
}

const mapDispatchToProps = (dispatch:Dispatch) => bindActionCreators({
  submit: loginAction
}, dispatch)

export const connectedLoginPage = connect(null, mapDispatchToProps)(Login)

