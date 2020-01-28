import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LoggedAppBar from '../AppBar';
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      initialItems : [],
      items: [],
      details:[],
      tempItems:[]
    };

    this.filterList = this.filterList.bind(this);

  }
  
  handleStar = (event) => {
    event.preventDefault();
    let url=event.target.name;
    console.log(url);
    axios.get(url).then(res => {
      console.log(res.data);
      let data_set=[];
      for(var key in res.data){
        data_set.push({'key':key, 'value':res.data[key]})  
      }
      this.setState({
        details:data_set
      });
    });
  }

  sortPopulation= function (population) {
    return function (x, y) {
        return ((x[population] === y[population]) ? 0 : ((x[population] > y[population]) ? 1 : -1));
    }
  }

  componentDidMount(){
    axios.get('https://swapi.co/api/planets/').then(res => {
      let itList=[];
      for(let i=0;i<res.data.results.length;i++){
          itList.push({'name':res.data.results[i].name, 'url':res.data.results[i].url, 'population':res.data.results[i].population});
      }
      this.setState({
        tempItems: itList,
        initialItems: itList
      });
    });
  }

  filterList=(e)=>{
    let updateList = this.state.initialItems;
    updateList = updateList.filter(item => {
      return item.name.toLowerCase().search(
        e.target.value.toLowerCase()
        ) !== -1;
    });
    updateList.sort(this.sortPopulation('population'));
    this.setState({
      items: updateList
    });
  }

  render() {
    return (
      <React.Fragment>
        <LoggedAppBar></LoggedAppBar>
        <Grid container spacing={3} style={{'padding':'20px'}}>
            <Grid item xs={2}>
        	    <h4>Search Item</h4>
              <input type="text" onChange={this.filterList} />
              <ul>
                  {this.state.items.map((item, ine) => 
                      <li key={item.name} style={{fontSize:(this.state.items.length*3)-(ine+3)}}><a href='#' name={item.url} onClick={this.handleStar}>{item.name}</a></li>
                  )}
              </ul>
            </Grid>
            <Grid item xs={10}>
              <Grid container spacing={3}>
                <Grid item xs={9}>
                  <h4>Planet Details</h4>
                  {this.state.details.map((data, index)=>
                    <Grid container spacing={3}>
                    <Grid item xs={2}>
                          {data.key}
                      </Grid>
                      <Grid item xs={9}>
                        {data.value}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Home;
