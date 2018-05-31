import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl } from 'react-native';
import { Button, Text } from 'native-base';
import UstadzList from './UstadzList';
import { limitUstadz, fetchUstadzs } from '../../actions/ustadz';

class UstadzPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 0,
      data: [],
    };
  }

  _handleLoadMore = () => {
    this.setState({ refreshing: true });
    this.props.limitUstadz(this.state.limit).then(() => {
      this.setState({ data: this.props.ustadz, refreshing: false });
      this.setState({ limit: this.state.limit + 4 });
    }).catch(err => console.log(err));
  }
  handleRefresh = () => {
    this.setState({
      refreshing: true,
    });
    this.props.fetchUstadzs().then(() => {
      this.setState({ refreshing: false, data: this.props.ustadz, limit: 0 });
    }).catch(err => console.log(err));
  }
  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.handleRefresh()}
          />
        }
      >
        {
          this.props.ustadz.map(ustadzs => <UstadzList navigation={this.props.navigation} ustadz={ustadzs} key={ustadzs._id} />)
        }
        {/* <Button 
          onPress={() => this._handleLoadMore()}
          block
          style={{
            marginTop: 40,
          }}
        >
          <Text>load more</Text>
        </Button> */}
      </ScrollView>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    ustadz: state.ustadz.data,
  };
}

export default connect(mapStateToProps, { fetchUstadzs, limitUstadz })(UstadzPage);
