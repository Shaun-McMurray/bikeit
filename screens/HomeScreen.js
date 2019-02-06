import React from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { LinearGradient } from 'expo'
import ApiConstants from '../api/ApiConstants'
import axios from 'axios'
import Swiper from 'react-native-swiper'
import { MAPS_API_KEY } from 'react-native-dotenv'

// View 2
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


/** A bit untidy prototype class of the mode of our transport application. */
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      minutes_for_travel_driving: 0,
      minutes_for_travel_transit: 0,
      minutes_for_travel_bicycling: 0,
      mode_of_transporation: '',
      coffee_maker_times: [154941],
      coffee_maker_name: '',
    }

    // Bind functions.
    this._onPressButton = this._onPressButton.bind(this)
    this._onPressRefreshDataButton = this._onPressRefreshDataButton.bind(this)
    this._handleChangeIndex = this._handleChangeIndex.bind(this)
    this.getBikeRoute = this.getBikeRoute.bind(this)
    this.getTransitRoute = this.getTransitRoute.bind(this)
    this.getDrivingRoute = this.getDrivingRoute.bind(this)
  }
  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    this.setupCalendarEvent()
  }

  /** To use the native calendar we have to eject from expo. */
  async setupCalendarEvent() {
    //Calendar events: no obvious solution atm.
    var permission = await Expo.Permissions.askAsync('calendar')
    console.log(permission)
    
    var cal = await Expo.Calendar.getCalendarsAsync()
    cal.alarm
  }

  /** Getting a Bike route */
  getBikeRoute() {
    var d = new Date()
    var seconds = Math.round(d.getTime() / 1000)
    let path_driving = ApiConstants.BASE_MAPS_URL + 'distancematrix/json'

    axios.get(path_driving, { params: {
      origins: 'Uddevallavägen+5,+442+30+Kungälv',
      destinations: 'Hjalmar+Brantingsplatsen,+Göteborg',
      mode: 'bicycling',
      language: 'en-EN',
      traffic_mode: 'optimistic',
      departure_time: seconds,
      key: MAPS_API_KEY
    }})
      .then(response => {
        let response_point = response.data.rows[0].elements[0].duration_in_traffic
        this.setState({
          minutes_for_travel_bicycling: response_point.value
        })
      })
      .catch(error => console.error(error))
  }

  /** Getting a Transit route */
  getTransitRoute() {
    var d = new Date()
    var seconds = Math.round(d.getTime() / 1000)
    let path_transit = ApiConstants.BASE_MAPS_URL + 'distancematrix/json'
    axios.get(path_transit, { params: {
      origins: 'Uddevallavägen+5,+442+30+Kungälv',
      destinations: 'Hjalmar+Brantingsplatsen,+Göteborg',
      mode: 'transit',
      language: 'en-EN',
      traffic_mode: 'optimistic',
      departure_time: seconds,
      key: MAPS_API_KEY
    }})
      .then(response => {
        let response_point = response.data.rows[0].elements[0].duration
        this.setState({
          minutes_for_travel_transit: response_point.value
        })
      })
      .catch(error => console.error(error))
  }

  /** Getting a Car route */
  getDrivingRoute() {
    var d = new Date()
    var seconds = Math.round(d.getTime() / 1000)
    let path_driving = ApiConstants.BASE_MAPS_URL + 'distancematrix/json'
    axios.get(path_driving, { params: {
      origins: 'Uddevallavägen+5,+442+30+Kungälv',
      destinations: 'Hjalmar+Brantingsplatsen,+Göteborg',
      mode: 'driving',
      language: 'en-EN',
      traffic_mode: 'pessimistic',
      departure_time: seconds,
      key: MAPS_API_KEY
    }})
      .then(response => {
        let response_point = response.data.rows[0].elements[0].duration_in_traffic
        this.setState({
          minutes_for_travel_driving: response_point.value
        })
      })
      .catch(error => console.error(error))
  }

  _onPressButton() {
    
      this.getDrivingRoute()
      this.getTransitRoute()

      if (this.state.minutes_for_travel_biking < this.state.minutes_for_travel_transit) {
        this.setState({
          mode_of_transporation: 'Bike'
        })      
      } else if(this.state.minutes_for_travel_driving <= this.state.minutes_for_travel_transit) {
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

  _handleChangeIndex(e) {
    this.setState({
      index: e
    })
  }

  _onPressRefreshDataButton() {
    axios.get('http://192.168.1.252:3000/send-coffemaker-on')
      .then(json => {
        let data_point = json.data.payload.devices[0]
        
        this.setState(prevState => ({
          coffee_maker_times: [
            ...prevState.coffee_maker_times, 
            data_point.customData.time
          ]
        }))
        
        if(this.state.coffee_maker_name === '') {
          this.setState({
            coffee_maker_name: data_point.name.name
          })
        }
      })
      .catch(error => console.error(error))
  }

  render() {
    const imageIsLoaded = this.state.mode_of_transporation
    const BUS_ICON = require('../assets/images/bus.png')
    const CAR_ICON = require('../assets/images/car.png')
    const BIKE_ICON = require('../assets/images/bicycle.png')
    const NO_ICON = require('../assets/images/placeholder.png')

    let image = imageIsLoaded === 'Bus' ? BUS_ICON : CAR_ICON

    if(imageIsLoaded === 'Bus') {
      image = BUS_ICON
    } else if (imageIsLoaded === 'Car') {
      image = CAR_ICON
    } else if (imageIsLoaded === 'Bike') {
      image = BIKE_ICON
    } else {
      image = NO_ICON
    }
    
    let reverse_icon = '\u21BB'

    return (
      <Swiper style={ styles.wrapper } loop={true} horizontal={true} index={this.state.index} showsPagination={false} onIndexChanged={this._handleChangeIndex}>
        <View style={ styles.slideOne }>
          <View style={styles.container}>
              <LinearGradient style={styles.welcomeContainer} colors={ ['transparent', 'rgba(166, 229, 160, 0.2)'] }>
                <Image
                  source={ require('../assets/images/A6.png') }
                  style={ styles.welcomeImage }
                />
              </LinearGradient>

            <View style={ styles.gridLine }/>

            <View style={ styles.inputViewTop }>
              <TouchableOpacity onPress={ this._onPressButton }>
                <Text style={styles.goText}>{ reverse_icon }</Text>
              </TouchableOpacity>
            </View>
            <View style={ styles.inputViewBottom }>

            <Text style={ styles.bodyText }>Today you should take the</Text>
            <Text style={ styles.headerText }>{ this.state.mode_of_transporation }</Text>
            <Image style={ styles.transportImage } source = { image } />    

            <Image style={ styles.poweredByGoogleImage } source={ require('../assets/images/powered_by_google_on_white.png') } />

            </View>
              <View style={ [styles.codeHighlightContainer, styles.navigationFilename] }>
              </View>
          </View>
        </View>
        <View style={ styles.slideTwo }>
          
          <AreaChart
            start={ 154941 }
            style={{ height: 200, width: 200 }}
            data={ this.state.coffee_maker_times }
            contentInset={{ top: 30, bottom: 30 }}
            curve={ shape.curveNatural }
            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          >
            <Grid/>
          </AreaChart>
          <Text>{ this.state.coffee_maker_name }</Text>


          <TouchableOpacity onPress={ this._onPressRefreshDataButton }>
            <Text style={styles.goText}>{ reverse_icon }</Text>
          </TouchableOpacity>

        </View>
      </Swiper>
    )
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
    color: '#000',
  },
  gridLine: {
    height: 5,
    backgroundColor: '#BBDEFB',
  },
  transportImage: {
    height: 80,
    resizeMode: 'contain',
  },
  bodyText: {
    fontSize: 16
  },
  headerText: {
    fontSize: 24
  },
  poweredByGoogleImage: {
    height: 16,
    marginTop: 30,
    resizeMode: 'center'
  },
})
