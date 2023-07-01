// eslint-disable-next-line
import './App.css';
import LoadingBar from 'react-top-loading-bar';

// we'll now use react class based component
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
export default class App extends Component {
  state={
    progress:0
  }
  
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return ( 
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        />
        <NavBar/>
        
        <Routes> 
            <Route exact path='/' element={<News setProgress={this.setProgress}  key='General' pageSize={12} country='in' category='General' />}></Route>
            <Route exact path='/Business' element={<News setProgress={this.setProgress}  key='Business' pageSize={12} country='in' category='Business' />}></Route>
            <Route exact path='/Entertainment' element={<News setProgress={this.setProgress}  key='Entertainment' pageSize={12} country='in' category='Entertainment' />}></Route>
            <Route exact path='/General' element={<News setProgress={this.setProgress}  key='General' pageSize={12} country='in' category='General'/>}></Route>
            <Route exact path='/Health' element={<News setProgress={this.setProgress}  key='Health' pageSize={12} country='in' category='Health' />}></Route>
            <Route exact path='/Science' element={<News setProgress={this.setProgress}  key='Science' pageSize={12} country='in' category='Science' />}></Route>
            <Route exact path='/Sports' element={<News setProgress={this.setProgress}  key='Sports' pageSize={12} country='in' category='Sports' />}></Route>
            <Route exact path='/Technology' element={<News setProgress={this.setProgress}  key='Technology' pageSize={12} country='in' category='Technology' />}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}




