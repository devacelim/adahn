import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 100
    },
    button: {
        margin: theme.spacing.unit,
        marginTop:25
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
            marginTop: 8,
        width:100
    },
    textField_Mul: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width:250
    },
    cell:{
        paddingRight:5,
        textAlign: 'center',
        width:100
    },
     cellContents:{
        paddingRight:5,
        textAlign: 'center',
         minWidth:400
    }
});

class  Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
           condi:'',
            value:'',
            pre:'',
            start:moment().subtract(30,'days').toDate(),
            end:new Date()
        }
        // console.log(this.props.Position)
    }
    componentWillReceiveProps(nextProps){
        // console.log(nextProps)
        if ( nextProps.Reload==true ) {
             this.setState({
                  condi: '',
                  value: '',
                  pre: '',
                  start: moment().subtract(30, 'days').toDate(),
                  end: new Date()
              })
            this.props.onReloadStop();
              // this.props.onSearch({init:true})
        }

    }


      handleChange(e){
        let nextState={};
        let pre=''
        nextState[e.target.name] = e.target.value;

        if(e.target.name =='condi'){
            pre = e.target.value.split('-')[0]
            nextState['pre']=pre
        }
        // console.log(nextState)

        this.setState(nextState);

    };
    handleChangeStartDate(date) {
    this.setState({
      start: date
    });
  }
  handleChangeEndDate(date) {
    this.setState({
      end: date
    });
  }
  onSearchInit(){
      this.setState({
          condi: '',
          value: '',
          pre: '',
          start: moment().subtract(30, 'days').toDate(),
          end: new Date()
      })

     this.props.onSearch({init:true})
  }

  onSearchButton(start,end,condi,value)
  {
    let obj={}
    if ( condi.split('-')[0] == 't'){
        if ( value =='' || value==undefined) {
            alert('검색어를 입력해주세요');
            return
        }
    }

    obj.start = moment(start).format('YYYY-MM-DD')
    obj.end = moment(end).format('YYYY-MM-DD')
    obj.condi = condi
    obj.value = value
      obj.init = false
// console.log(obj)
      this.props.onSearch(obj)

  }

  _handleKeyPress(e) {

    	if (e.key === 'Enter'){
    	    this.onSearchButton(this.state.start,this.state.end,this.state.condi,this.state.value)
        }
  	}



    render(){
         const { classes } = this.props;

        return(
            // search
            <div>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="age-simple">검색조건</InputLabel>
                      <Select
                        value={this.state.condi}
                        onChange={this.handleChange.bind(this)}
                        inputProps={{
                          name: 'condi',
                          id: 'age-simple',
                        }}
                      >
                        <MenuItem value="">
                          <em>없음</em>
                        </MenuItem>
                        <MenuItem value={'t-company_name'}>회사명</MenuItem>
                        <MenuItem value={'t-company_emp'}>업체직원</MenuItem>
                        <MenuItem value={'t-confirm_name'}>확인자</MenuItem>
                          <MenuItem value={'t-writer_name'}>작성자</MenuItem>
                          <MenuItem value={'t-contents'}>상담내용</MenuItem>
                          <MenuItem value={'d-handle_date'}>확인일</MenuItem>
                          <MenuItem value={'d-expire_date'}>처리기한</MenuItem>
                          <MenuItem value={'d-complete_date'}>완료일</MenuItem>
                          <MenuItem value={'d-reg_date'}>등록날짜</MenuItem>
                      </Select>
                    </FormControl>




                {this.state.pre =='t' ?
                <TextField
                      id="standard-name"
                      label="검색어"
                      name="value"
                      className={classes.textField}
                      value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                      onKeyPress={this._handleKeyPress.bind(this)}
                      margin="normal"
                    />

                    :''
                }
                {this.state.pre=='d' ?

                <DatePicker
                      customInput={<CustomCal />}
                      selected={this.state.start}
                        selectsStart
                        startDate={this.state.start}
                        endDate={this.state.end}
                        onChange={this.handleChangeStartDate.bind(this)} />

                                    :''}
                {this.state.pre=='d' ?


                    <DatePicker
                         customInput={<CustomCal />}
                        selected={this.state.end}
                        selectsEnd
                        startDate={this.state.start}
                        endDate={this.state.end}
                        onChange={this.handleChangeEndDate.bind(this)}
                    />
                         :''}
                {this.state.pre? <Button  onClick={this.onSearchButton.bind(this,this.state.start,this.state.end,this.state.condi,this.state.value)} style={{marginTop:'25px'}} variant="outlined" size="small">검색</Button>:''}
                {this.state.pre? <Button onClick={this.onSearchInit.bind(this)} style={{marginTop:'25px'}} variant="outlined" size="small">검색 초기화</Button>:''}

            </div>
        )
    }

}
class CustomCal extends React.Component {

  render () {
    return (
      <Button style={{marginTop:'25px'}}
       variant="outlined" size="small"
        onClick={this.props.onClick}>
        {this.props.value ? moment(this.props.value).format('YYYY-MM-DD') : '날짜선택'}
      </Button>
    )
  }
}


export default withStyles(styles)(Search);