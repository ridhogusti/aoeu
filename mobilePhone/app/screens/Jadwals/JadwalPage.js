import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ScrollView, RefreshControl, View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import JadwalList from './JadwalList';
import { limitJadwalUmum, fetchAllJadwals } from '../../actions/jadwal';

class JadwalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 0,
      data: [],
      items: {},
      date: [],
      itemss: {},
    };
  }
  async componentDidMount() {
    await this.props.fetchAllJadwals();
    this.setState({ date: this.props.jadwals });
  }

  _handleLoadMore = () => {
    this.setState({ refreshing: true });
    this.props.limitJadwalUmum(this.state.limit).then(() => {
      this.setState({ data: this.props.jadwals, refreshing: false });
      this.setState({ limit: this.state.limit + 4 });
    }).catch(err => console.log(err));
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.props.fetchAllJadwals().then(() => {
      this.setState({ refreshing: false, data: this.props.jadwals, limit: 0 });
    }).catch(err => console.log(err));
  }
  loadItems(day) {
    setTimeout(() => {
      // const date = this.props.jadwals;
      const strJadwal = [];
      for (let i = 0; i < this.state.date.length; i++) {
        const formatDate = moment(this.state.date[i].tanggal).format('YYYY-MM-D');
        strJadwal[i] = formatDate;
      }
      const strJadwalunique = [...new Set(strJadwal)]; 
      const reversestrJadwalunique = strJadwalunique.reverse();
      // console.log(this.state.date, 'jadwal', strJadwalunique.reverse());
      for (let i = 0; i < reversestrJadwalunique.length; i++) {
        if (!this.state.itemss[reversestrJadwalunique[i]]) {
          this.state.itemss[reversestrJadwalunique[i]] = [];
          this.state.itemss['2018-04-27'] = [];
          this.state.itemss['2018-04-28'] = [];
          this.state.itemss['2018-04-29'] = [];
          this.state.itemss['2018-04-30'] = [];
          this.state.itemss['2018-05-01'] = [];
          this.state.itemss['2018-05-02'] = [];
          this.state.itemss['2018-05-03'] = [];
          this.state.itemss['2018-05-04'] = [];
          this.state.itemss['2018-05-05'] = [];
          this.state.itemss['2018-05-06'] = [];
          this.state.itemss['2018-05-07'] = [];
          this.state.itemss['2018-05-08'] = [];
          this.state.itemss['2018-05-09'] = [];
          this.state.itemss['2018-05-10'] = [];
          for (let j = 0; j < this.state.date.length; j++) {
            if (reversestrJadwalunique[i] == moment(this.state.date[j].tanggal).format('YYYY-MM-D')) {
              this.state.itemss[reversestrJadwalunique[i]].push({
                name: this.state.date[j].tema,
                height: Math.max(50, Math.floor(Math.random() * 150)),
              });
            }
          }
        }
      }
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: `Item for ${strTime}`,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      // console.log(this.state.items, 'dari loaditems');
      const newItems = {};
      Object.keys(this.state.itemss).forEach(key => { newItems[key] = this.state.itemss[key]; });
      this.setState({
        itemss: newItems,
      });
      // Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      // this.setState({
      //   items: newItems,
      // });
    }, 1000);

    // console.log(this.state.itemss, 'dari loaditems');
    // console.log(this.state.items, 'dari loaditems');
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }
  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }
  render() {
    return (
      // <ScrollView
      //   refreshControl={
      //     <RefreshControl
      //       refreshing={this.state.refreshing}
      //       onRefresh={() => this.handleRefresh()}
      //     />
      //   }
      // >
      <Agenda
        items={this.state.itemss}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2018-04-25'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    /* {
          this.props.jadwals.map(jadwal => <JadwalList navigator={this.props.navigator} jadwal={jadwal} key={jadwal._id} />)
        }
        <Button 
          onPress={() => this._handleLoadMore()}
          block
          style={{
            marginTop: 40,
          }}
        >
          <Text>load more</Text>
        </Button> */
      /* </ScrollView> */
      
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    jadwals: state.jadwals.data,
  };
}

export default connect(mapStateToProps, { fetchAllJadwals, limitJadwalUmum })(JadwalPage);
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
