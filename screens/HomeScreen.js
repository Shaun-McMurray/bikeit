import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo'
import ApiConstants from '../api/ApiConstants'
import axios from 'axios'
import Swiper from 'react-native-swiper'
import { MAPS_API_KEY } from 'react-native-dotenv'


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      minutes_for_travel_driving: 0,
      minutes_for_travel_transit: 0,
      mode_of_transporation: ''
    }
    this._onPressButton = this._onPressButton.bind(this)
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.setupCalendarEvent()
  }

  async setupCalendarEvent() {
    //Calendar events: no obvious solution atm.
    var permission = await Expo.Permissions.askAsync('calendar');
    console.log(permission);
    
    var cal = await Expo.Calendar.getCalendarsAsync();
  }

  _onPressButton() {
    let path_driving = ApiConstants.BASE_MAPS_URL + 
    'distancematrix/json?origins=Uddevallavägen+5,+442+30+Kungälv&destinations=Hjalmar+Brantingsplatsen,+Göteborg&mode=driving&language=en-EN&traffic_mode=pessimistic&departure_time=1549411671&key=' + MAPS_API_KEY
    
    axios.get(path_driving)
      .then(response => {
        this.setState({
          minutes_for_travel_driving: response.data.rows[0].elements[0].duration_in_traffic.value
        })
      })
      .catch(error => console.error(error))

      let path_transit = ApiConstants.BASE_MAPS_URL + 
      'distancematrix/json?origins=Uddevallavägen+5,+442+30+Kungälv&destinations=Hjalmar+Brantingsplatsen,+Göteborg&mode=transit&language=en-EN&departure_time=1549411671&key=' + MAPS_API_KEY
      
      axios.get(path_transit)
      .then(response => {
        this.setState({
          minutes_for_travel_transit: response.data.rows[0].elements[0].duration.value
        })
      })
      .catch(error => console.error(error))

      if(this.state.minutes_for_travel_driving <= this.state.minutes_for_travel_transit) {
        this.setState({
          mode_of_transporation: 'Bus'
        })
      } else if (this.state.minutes_for_travel_driving > this.state.minutes_for_travel_transit){
        this.setState({
          mode_of_transporation: 'Car'
        })
      } else {
        this.setState({
          mode_of_transporation: ''
        })
      }
  }



  render() {
    const imageIsLoaded = this.state.mode_of_transporation;
    const BUS_ICON = require('../assets/images/bus.png')
    const CAR_ICON = require('../assets/images/car.png')
    const BIKE_ICON = require('../assets/images/bicycle.png')
    const NO_ICON = require('../assets/images/placeholder.png')

    let image = imageIsLoaded === 'Bus' ? BUS_ICON : CAR_ICON;

    if(imageIsLoaded === 'Bus') {
      image = BUS_ICON
    } else if (imageIsLoaded === 'Car') {
      image = CAR_ICON
    } else if (imageIsLoaded === 'Bike') {
      image = BIKE_ICON
    } else {
      image = NO_ICON
    }
    
    let reverse_icon = '\u21BB';

    return (
      <Swiper style={ styles.wrapper } loop={true} horizontal={true} index={0} showsPagination={false}>
        <View style={ styles.slideOne }>
          <View style={styles.container}>
              <LinearGradient style={styles.welcomeContainer} colors={ ['transparent', 'rgba(166, 229, 160, 0.5)'] }>
                <Image
                  source={
                      require('../assets/images/A6.png')
                  }
                  style={ styles.welcomeImage }
                />
              </LinearGradient>

            <View style={styles.gridLine}/>

            <View style={styles.inputViewTop}>
              <TouchableOpacity onPress={ this._onPressButton }>
                <Text style={styles.goText}>{ reverse_icon }</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputViewBottom}>
          {
            /*
            <Text>{this.state.minutes_for_travel_driving}</Text>
            <Text>{this.state.minutes_for_travel_transit}</Text>
            */
          } 
            <Text style={ styles.bodyText }>Today you should take the</Text>
            <Text style={ styles.headerText }>{this.state.mode_of_transporation}</Text>
            <Image style={ styles.transportImage } source = { image } />    

            </View>
              <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
              </View>
          </View>
        </View>
        <View style={styles.slideTwo}>
          <Text>Slide 2</Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  slideOne: {
    flex: 1,
  },
  slideTwo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  contentContainer: {
    paddingTop: 20,
  },
  welcomeContainer: {
    backgroundColor: '#EEFFFF',
    alignItems: 'center',
    marginTop: 0,
  },
  welcomeImage: {
    width: 192,
    height: 241,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  inputViewBottom: {
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  inputViewTop: {
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  goButton: {
    backgroundColor: '#EEFFFF',
    alignItems: 'center',
  },
  goText: {
    fontSize: 80,
    fontFamily: 'Roboto',
    color: '#000',
  },
  gridLine: {
    height: 5,
    backgroundColor: '#BBDEFB',
  },
  transportImage: {
    height: 100,
    resizeMode: 'contain',
  },
  bodyText: {
    fontSize: 16
  },
  headerText: {
    fontSize: 24
  },
});
