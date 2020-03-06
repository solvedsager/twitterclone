import React, { Component, Fragment } from "react";
import moment from 'moment';
import Navbar from './Navbar';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
  } from "react-router-dom";
import Spinner from './layout/Spinner';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);


        this.state = {
            loading: true,
            info: [],
            statuses: [],
            mentions: [],
            likes: [],
            entered: '@juliaridendirty',
            tweet: '',
            showMentions: false,
            showRecent: true,
            showLikes: false
        }
    }

    componentDidMount() {
        this.loadData();
    }
    
    loadData = () => {
        const { entered } = this.state;

        // fetch data or promises

        // fetch(`http://localhost:5000/users/${entered}`)
        
        fetch(`http://localhost:5000/statuses/${entered}`)
        .then(res => res.json())
        .then(data =>
          this.setState({
            statuses: data,
        })
        ).catch(error => this.setState({ error, loading: false }));
    
        // get user info
        fetch(`http://localhost:5000/users/${entered}`)
        .then(res => res.json())
        .then(data =>
          this.setState({
            info: data,
            loading: false
        })
        ).catch(error => this.setState({ error, loading: false }));
  
        // get mentions
        fetch('http://localhost:5000/api/twitD')
        .then(res => res.json())
        .then(data =>
          this.setState({
            mentions: data,
            loading: false
        })
        ).catch(error => this.setState({ error, loading: false }));

        // get likes
        fetch('http://localhost:5000/api/twitE')
        .then(res => res.json())
        .then(data =>
          this.setState({
            likes: data,
            loading: false
        })
        ).catch(error => this.setState({ error, loading: false }));
    }

    handleChange(e) {
        this.setState({entered: e.target.value});
    } 


    handleClick(e) {
        this.loadData();
        console.log('clicked');
    }

    handleToggle(e, id) {
      const { showMentions, showLikes, showRecent } = this.state;
      console.log(id);
      if(id == 1) {
        this.setState(prevState => ({
          showLikes: false,
          showRecent: true,
          showMentions: false
        }));
        console.log('recent');
      } else if(id ==2 ) {
        this.setState(prevState => ({
          showLikes: true,
          showRecent: false,
          showMentions: false
        }));
        console.log('likes');
      } else {
        this.setState(prevState => ({
          showLikes: false,
          showRecent: false,
          showMentions: true
        }));
        console.log('mentions');
      }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.loadData();
    }

    render() {
        const { likes, mentions, statuses, info, error, entered, loading, tweet, showLikes, showMentions, showRecent } = this.state;

        return (
            <Fragment>
                <div>
                {/* navbar */}
                <div className="w3-top">
                    <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
                    <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i className="fa fa-bars"></i></a>
                    <a href="#" className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i className="fab fa-twitter w3-margin-right"></i>Logo</a>
                    {/* <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i className="fa fa-globe"></i></a>
                    <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i className="fa fa-user"></i></a>
                    <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"><i className="fa fa-envelope"></i></a>
                     */}
                    <div className="w3-dropdown-hover w3-hide-small">
                        <button className="w3-button w3-padding-large" title="Notifications"><i className="fa fa-bell"></i><span className="w3-badge w3-right w3-small w3-green">3</span></button>
                        <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{width:"300px"}}>
                            <a href="#" className="w3-bar-item w3-button">One new friend request</a>
                            <a href="#" className="w3-bar-item w3-button">John Doe posted on your wall</a>
                            <a href="#" className="w3-bar-item w3-button">Jane likes your post</a>
                        </div>
                    </div>
                        <input style={{width: "30%"}} placeholder="Status: Feeling Blue" className="w3-border w3-padding" type="text" value={entered} onChange={this.handleChange} />
                        <button style={{display: "inline"}} className="w3-button w3-theme" type="submit" value="Submit" onClick={this.handleClick}>New Handle</button>
                    <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account"></a>
                    </div>
                    
                    <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
                    <a href="#" className="w3-bar-item w3-button w3-padding-large">My Profile</a> 
                    </div>
                    
                </div>

            { !loading ? (
                    <div className="w3-container w3-content" style={{maxWidth: "1400px", marginTop: "80px"}}>
                     <div className="w3-row">
                         {/* left-column */}
                        <div className="w3-col m4">
                            {/* profile */}
                            <div className="w3-card w3-round w3-white">
                                <div className="w3-container">
                                {/* screen_name */}

                                    { !loading ? (
                                    <h4 className="w3-center">{this.state.info.screen_name}</h4>
                                    ) : (
                                        <h3>Loading</h3>
                                    )}
                                {/* profile image */}
                                    <p className="w3-center">
                                        { !loading ? (
                                        <img src={this.state.info.profile_image_url} className="w3-circle" style={{height:"106px", width:"106px"}} alt="Avatar"></img>
                                        ) : (
                                        <h3>Loading</h3>
                                        )}
                                    </p>
                                    <hr></hr>
                                {/* profile info */}
                                    { !loading ? (
                                    <div>
                                        <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> {this.state.info.name}</p>
                                        <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> @{this.state.info.screen_name}</p>
                                        <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> {this.state.info.description}</p>
                                        <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> followers: {this.state.info.followers_count}</p>
                                        <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> following: {this.state.info.friends_count}</p>
                                        <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> statuses: {this.state.info.statuses_count}</p>
                                        <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> member since: {this.state.info.created_at}</p>
                            
                                    </div>
                                    ) : (
                                        <h3>Loading</h3>
                                    )}

                                </div>
                            </div>

                            <br></br>
                            {/* end left column */}
                        </div>
                        {/* middle column */}
                        <div className="w3-col m7">
                            <div className="w3-row-padding">
                                <div className="w3-col m12">
                                    <div className="w3-card w3-round w3-white" style={{marginBottom: '15px'}}>
                                        <div className="w3-container w3-padding" style={{marginBottom: '20px'}}>
                                            <div className="w3-container w3-padding" style={{marginBottom: '20px'}}>
                                                <form onSubmit={this.handleSubmit}>
                                                    <input style={{width: "100%"}} placeholder="Status: Feeling Blue" className="w3-border w3-padding" type="text" value={tweet} onChange={this.handleChange} />
                                                    <button style={{display: "block", marginTop: "5px"}} className="w3-button w3-theme" type="submit" value="Submit"><i className="fa fa-pencil"></i>Post</button>
                                                </form>
                                                <div style={{justifyContent: "center", textAlign:"center", alignItems:"center", display: "flex", flexDirection: "row"}}>
                                                    <ul>
                                                        <li>
                                                          <button onClick={(e) => this.handleToggle(e, '1')} className='btn btn-primary my-1' key="1">Recent</button>
                                                        </li>
                                                        <li>
                                                        <button onClick={(e) => this.handleToggle(e, '2')} className='btn btn-primary my-1' key="2">Likes</button>
                                                        </li>
                                                        <li>
                                                        <button onClick={(e) => this.handleToggle(e, '3')} className='btn btn-primary my-1' key="3">Mentions</button>
                                                        </li>
                                                    </ul>

                                                   
                                                </div>

                                               
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                    { !loading && showRecent ? (
                                          statuses.map(post => {
                                            const { created_at, text, screen_name, id, user, retweeted_status } = post;
                                            const created_hat = fixDates(created_at);
                                            // console.log(created_hat);
                                            let rt = true;
                                            if(retweeted_status === undefined) {
                                              // console.log('not rt')
                                              rt = false;
                                            }
                                            let imgUrl = user.profile_image_url;
                                            if(rt) {
                                              imgUrl = retweeted_status.user.profile_image_url
                                            }
                                  
                                            return (
                                              <div key ={ id }>
                                                <div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>
                                                
                                                        <img src={imgUrl} 
                                                        alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width:"60px"}}></img>
                                                        <span className="w3-right w3-opacity">{created_hat}</span>
                                                        <h4>{ screen_name }</h4><br></br>
                                                        <hr className="w3-clear"></hr>
                                                        <p>{ text }</p>
                                                        { !rt ?
                                                          (<p>{user.name}</p>) : (   
                                                                              <p>{retweeted_status.user.name}</p>
                                                            )
                                                        }
                                  
                                  
                                                        <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button>
                                                        <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Retweet</button>
                                                  </div>
                                              </div>
                                            )
                                          })
                                          ) : (
                                            <h3></h3>
                                          )}
                                  </div>
                                            <div>
                                  { !loading && showLikes ? (
              likes.map(post => {
              const { created_at, text, screen_name, id, user, retweeted_status } = post;
              const created_hat = fixDates(created_at);
              // console.log(created_hat);
              let rt = true;
              if(retweeted_status === undefined) {
                // console.log('not rt')
                rt = false;
              }
              let imgUrl = user.profile_image_url;
              if(rt) {
                imgUrl = retweeted_status.user.profile_image_url
              }
    
              return (
                <div key ={ id }>
                  <div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>
                  
                          <img src={imgUrl} 
                          alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width:"60px"}}></img>
                          <span className="w3-right w3-opacity">{created_hat}</span>
                          <h4>{ screen_name }</h4><br></br>
                          <hr className="w3-clear"></hr>
                          <p>{ text }</p>
                          { !rt ?
                            (<p>{user.name}</p>) : (   
                                                 <p>{retweeted_status.user.name}</p>
                              )
                          }
    
    
                          <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button>
                          <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Retweet</button>
                    </div>
                </div>
              )
            })
            ) : (
              <h3></h3>
            )}
    </div>


                                  <div>
       { !loading && showMentions ? (
            mentions.statuses.map(post => {
              const { created_at, text, screen_name, id, user, retweeted_status } = post;
              const created_hat = fixDates(created_at);
              // console.log(created_hat);
              let rt = true;
              if(retweeted_status === undefined) {
                // console.log('not rt')
                rt = false;
              }
              let imgUrl = user.profile_image_url;
              if(rt) {
                imgUrl = retweeted_status.user.profile_image_url
              }
    
              return (
                <div key ={ id }>
                  <div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>
                  
                          <img src={imgUrl} 
                          alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width:"60px"}}></img>
                          <span className="w3-right w3-opacity">{created_hat}</span>
                          <h4>{ screen_name }</h4><br></br>
                          <hr className="w3-clear"></hr>
                          <p>{ text }</p>
                          { !rt ?
                            (<p>{user.name}</p>) : (   
                                                 <p>{retweeted_status.user.name}</p>
                              )
                          }
    
    
                          <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button>
                          <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Retweet</button>
                    </div>
                </div>
              )
            })
            ) : (
              <h3></h3>
            )}
    </div>
{/*                                             
                                    <Switch>
                                        <Route path="/profile/" component={User} />
                                        <Route path="/profile/two" component={User2} />
                                        <Route
                                            path='/profile/mentions'
                                            render={(props) => <Fun {...props} mentions={mentions} loading={loading} />}
                                            />
                                    </Switch> */}

                                </div>
                            {/* map through tweets */}
                                
                        {/* end middle */}
                        
                        </div>
                    {/* right-column */}
                    </div>     
                </div>
            </div>
      
            ) : (
                    <Spinner/>
                )}
            </div>
        </Fragment>
        )
    }
}

               

const User = () => <p>1</p>
const User2 = () => <p>2</p>


const Fuzz = ({loading, match, info}) => {

  return (
    <div>
       { !loading ? (
            info.map(post => {
              const { created_at, text, screen_name, id, user, retweeted_status } = post;
              const created_hat = fixDates(created_at);
              // console.log(created_hat);
              let rt = true;
              if(retweeted_status === undefined) {
                // console.log('not rt')
                rt = false;
              }
              let imgUrl = user.profile_image_url;
              if(rt) {
                imgUrl = retweeted_status.user.profile_image_url
              }
    
              return (
                <div key ={ id }>
                  <div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>
                  
                          <img src={imgUrl} 
                          alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width:"60px"}}></img>
                          <span className="w3-right w3-opacity">{created_hat}</span>
                          <h4>{ screen_name }</h4><br></br>
                          <hr className="w3-clear"></hr>
                          <p>{ text }</p>
                          { !rt ?
                            (<p>{user.name}</p>) : (   
                                                 <p>{retweeted_status.user.name}</p>
                              )
                          }
    
    
                          <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button>
                          <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Retweet</button>
                    </div>
                </div>
              )
            })
            ) : (
              <h3>Loading</h3>
            )}
    </div>
  )

}

const Fun = ({loading, match, mentions}) => {

    return (
      <div>
         { !loading ? (
              mentions.statuses.map(post => {
                const { created_at, text, screen_name, id, user, retweeted_status } = post;
                const created_hat = fixDates(created_at);
                // console.log(created_hat);
                let rt = true;
                if(retweeted_status === undefined) {
                  // console.log('not rt')
                  rt = false;
                }
                let imgUrl = user.profile_image_url;
                if(rt) {
                  imgUrl = retweeted_status.user.profile_image_url
                }
      
                return (
                  <div key ={ id }>
                    <div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>
                    
                            <img src={imgUrl} 
                            alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width:"60px"}}></img>
                            <span className="w3-right w3-opacity">{created_hat}</span>
                            <h4>{ screen_name }</h4><br></br>
                            <hr className="w3-clear"></hr>
                            <p>{ text }</p>
                            { !rt ?
                              (<p>{user.name}</p>) : (   
                                                   <p>{retweeted_status.user.name}</p>
                                )
                            }
      
      
                            <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button>
                            <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Retweet</button>
                      </div>
                  </div>
                )
              })
              ) : (
                <h3>Loading</h3>
              )}
      </div>
    )
  
  }
  
  const Fudge = ({loading, match, likes}) => {
  
    return (
      <div>
         { !loading ? (
              likes.map(post => {
                const { created_at, text, screen_name, id, user, retweeted_status } = post;
                const created_hat = fixDates(created_at);
                // console.log(created_hat);
                let rt = true;
                if(retweeted_status === undefined) {
                  // console.log('not rt')
                  rt = false;
                }
                let imgUrl = user.profile_image_url;
                if(rt) {
                  imgUrl = retweeted_status.user.profile_image_url
                }
      
                return (
                  <div key ={ id }>
                    <div className="w3-container w3-card w3-white w3-round w3-margin"><br></br>
                    
                            <img src={imgUrl} 
                            alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{width:"60px"}}></img>
                            <span className="w3-right w3-opacity">{created_hat}</span>
                            <h4>{ screen_name }</h4><br></br>
                            <hr className="w3-clear"></hr>
                            <p>{ text }</p>
                            { !rt ?
                              (<p>{user.name}</p>) : (   
                                                   <p>{retweeted_status.user.name}</p>
                                )
                            }
      
      
                            <button type="button" className="w3-button w3-theme-d1 w3-margin-bottom"><i className="fa fa-thumbs-up"></i>  Like</button>
                            <button type="button" className="w3-button w3-theme-d2 w3-margin-bottom"><i className="fa fa-comment"></i>  Retweet</button>
                      </div>
                  </div>
                )
              })
              ) : (
                <h3>Loading</h3>
              )}
      </div>
    )
  
  }


function fixDates(data){
    // console.log(data);
    // Thu Feb 20 02:51:05 +0000 2020
    let final = data;
    const l = final.length;
    // console.log(l);
    final = final.slice(0, 25);
    // Thu Feb 20 02:51:05 +0000
    let two = data.slice(0, 10)
      // Thu Feb 20
    let hey = data.slice(11, 19)
    let him = 'GMT+0000';
  
    let end = data.slice(26, 30)
    //2020
    // console.log(hey);
    var text3 = two.concat(" ", end);
    // console.log(text3);
   // console.log('text3');
    // Thu Feb 20 2020
    var text4 = text3.concat(" ", hey);
    var text5 = text4.concat(" ", him);
  
    // console.log(text4);
    // console.log(text5);
    var fin = moment(text5).fromNow();
    // Thu Feb 20 2020 19:09:33 GMT+0000
    // Fri Feb 21 2020 07:06:03 GMT+0000
    // console.log(moment('Fri Feb 21 2020 07:06:03 GMT+0600').fromNow());
    // console.log('data');
    // console.log(moment(text5).fromNow());
    // console.log('final');
  
    return fin;
}




export default Profile;