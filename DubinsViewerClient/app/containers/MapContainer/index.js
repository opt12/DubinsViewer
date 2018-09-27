/*
 *
 * MapContainer
 *
 */

import { Row, Col, Button, InputNumber } from 'antd';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectValue,
  selectSidebarVisible,
  selectTimerProps,
} from './selectors';
import { toggleSidebarVisibility, setTimer, setTimerDirty } from './actions';

import MapView from './MapView';  // we need the default import, not the named one! Otherwise, connect does not get called

import { INCREMENT_COUNTER, UPDATE_POSITION, DELETE_POSITION_LIST } from './constants';


export class MapContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const buttonStyle = { width: '150px', margin: '15px' };
    const { sidebarVisible, timerProps } = this.props;
    return (
      <div>
        <Col span={sidebarVisible ? 6 : 18}>
          <Row>
            {/*
            <Button style={buttonStyle} type="primary" onClick={this.props.onClickIncrement}>Increment</Button>
*/}
            <Button style={buttonStyle} type="default" onClick={() => this.props.onClickToggleSidebar(!sidebarVisible)}>
              {sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
            </Button>
          </Row>
          <Row>
            <MapView />
          </Row>
        </Col>
        <Col span={sidebarVisible ? 18 : 6}>
          <br />
          <Button style={buttonStyle} type="default" onClick={this.props.onClickUpdatePosition}>
            Update Position
          </Button>
          <Button style={buttonStyle} type="primary" onClick={this.props.onClickDeletePosList}>
            Reset Position List
          </Button>
          <InputNumber
            style={buttonStyle} defaultValue={500} value={timerProps.updateTimer} onChange={(e) => this.props.onChangeTimerInput(e)}
          />
          <Button
            style={buttonStyle} type="primary" onClick={
            () => this.props.onClickUpdateTimer(timerProps.updateTimer, !timerProps.dirty, timerProps.dirty)
          }
          >{timerProps.dirty ? 'Start Timer' : 'Stop Timer'}
          </Button>
        </Col>
      </div>
    );
  }
}

MapContainer.propTypes = {
  onClickToggleSidebar: PropTypes.func,
  onClickUpdateTimer: PropTypes.func,
  onClickUpdatePosition: PropTypes.func,
  onClickDeletePosList: PropTypes.func,
  onChangeTimerInput: PropTypes.func,
  sidebarVisible: PropTypes.bool,
  timerProps: PropTypes.object,

};

const mapStateToProps = (state) => {
  console.log('createStructuredSelector from MapContainer: ', state);
  return createStructuredSelector({
    value: selectValue(),
    sidebarVisible: selectSidebarVisible(),
    timerProps: selectTimerProps(),
  });
};

function mapDispatchToProps(dispatch) {
  return {
    onClickIncrement: () => dispatch({ type: INCREMENT_COUNTER }),
    onClickToggleSidebar: (sidebarVisible) => dispatch(toggleSidebarVisibility(sidebarVisible)),
    onClickUpdatePosition: () => dispatch({ type: UPDATE_POSITION }),
    onChangeTimerInput: (updateTimer) => dispatch(setTimerDirty(updateTimer)),
    onClickUpdateTimer: (updateTimer, dirty, timerRunning) => dispatch(setTimer(updateTimer, dirty, timerRunning)),
    onClickDeletePosList: () => dispatch({ type: DELETE_POSITION_LIST }),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
