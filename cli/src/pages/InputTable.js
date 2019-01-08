import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputFiles from 'react-input-files';
import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";

import {regWork} from '../services/post.js';


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
        width:100
    },
    textField_Mul: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width:250
    },
});

class  InputTable extends Component{

    constructor(props){
        super(props);
        this.state={
            company_name:'',
            company_emp:'',
            contents:'',
            confirm:'',
            date:'',
            apm:'오전',
            file:'',
            filename:'',
            calOpen:false,
            alert:false
        }
        // console.log(this.props.Users)
    }
    handleChangeDate(date) {
        this.setState({
            date: date
        });
        this.toggleCalendar()
    }
    toggleCalendar(e){
        e && e.preventDefault()
        this.setState({calOpen: !this.state.calOpen})
    }

    onUpload(value) {
// console.log(value)
        this.setState({filename:value[0].name,file:value});
    }
    handleChange(e){
        let nextState={};

        nextState[e.target.name] = e.target.value;


        this.setState(nextState);

    };

    async regInput(){
        let obj={}


        obj.company_name= this.state.company_name;
        obj.company_emp = this.state.company_emp;
        obj.contents = this.state.contents;
        obj.confirm = this.state.confirm;
        obj.date = this.state.date=='' ? '' : moment(this.state.date).format('YYYY-MM-DD');
        obj.file = this.state.filename !='' ?  this.state.file[0] : '';
        obj.filename = this.state.filename

        // console.log(obj)
        if ( obj.confirm=='' || obj.confirm==undefined || obj.date =='' ||obj.contents=='' || obj.contents==undefined){
            this.setState({alert:true})
            return;
        }
        else{
            this.setState({alert:false})
            let formData = new FormData();
            formData.append('company_name', obj.company_name);
            formData.append('company_emp', obj.company_emp);
            formData.append('confirm', obj.confirm);
            formData.append('contents', obj.contents);
            formData.append('expire_date', obj.date);
            formData.append('file', obj.file);
            formData.append('filename', obj.filename);
            formData.append('writer',this.props.LoginUser);
            formData.append('apm',this.state.apm);


            let res = await regWork(formData);

            if(res.data.affectedRows==1) {
                alert('저장되었습니다.')
                this.setState({
                     company_name:'',
                    company_emp:'',
                    contents:'',
                    confirm:'',
                    date:'',
                    file:'',
                    apm:'오전',
                    filename:'',
                    calOpen:false,
                    alert:false
                })
                this.props.InputHandler();
            }

        }


    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding='none'>
                                <TextField
                                    id="outlined-name"
                                    label="회사명"
                                    name="company_name"
                                    className={classes.textField}
                                    value={this.state.company_name}
                                    onChange={this.handleChange.bind(this)}
                                    margin="normal"

                                />
                            </TableCell >
                            <TableCell padding='none'>
                                <TextField
                                    id="outlined-name"
                                    label="업체직원"
                                    name="company_emp"
                                    className={classes.textField}
                                    value={this.state.company_emp}
                                    onChange={this.handleChange.bind(this)}
                                    margin="normal"

                                />
                            </TableCell>
                            <TableCell padding='none'>
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="상담내용"
                                    name="contents"
                                    multiline
                                    rowsMax="6"
                                    value={this.state.contents}
                                    onChange={this.handleChange.bind(this)}
                                    className={classes.textField_Mul}
                                    margin="normal"
                                />
                            </TableCell >

                            <TableCell padding='none'>
                                <TextField
                                    id="outlined-name"
                                    label="파일이름"
                                    name="filename"
                                    disabled
                                    className={classes.textField}
                                    value={this.state.filename}
                                    // onChange={this.handleChange.bind(this)}
                                    margin="normal"

                                />
                            </TableCell>
                            <TableCell padding='none'>

                                <InputFiles accept='*' onChange={this.onUpload.bind(this)}>
                                    <Button variant="outlined" size="small"  className={classes.button}>
                                        첨부파일
                                    </Button>
                                </InputFiles>
                            </TableCell>
                            <TableCell  padding='none'>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">확인자</InputLabel>
                                    <Select
                                        value={this.state.confirm}
                                        onChange={this.handleChange.bind(this)}
                                        inputProps={{
                                            name: 'confirm',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>없음</em>
                                        </MenuItem>
                                        {
                                            this.props.Users.map(user =>{

                                                return <MenuItem key={user.user_id} value={user.user_id}>{user.user_name}({user.user_id})</MenuItem>
                                            })
                                        }

                                    </Select>
                                </FormControl>

                            </TableCell>
                            <TableCell padding='none'>
                                <Button
                                    variant="outlined" size="small" className={classes.button}
                                    onClick={this.toggleCalendar.bind(this)}>

                                    {this.state.date =='' ? '처리기한':moment(this.state.date).format('YYYY-MM-DD')}

                                </Button>
                                {
                                    this.state.calOpen && (
                                        <DatePicker
                                            selected={this.state.date}
                                            onChange={this.handleChangeDate.bind(this)}
                                            withPortal
                                            minDate={new Date()}
                                            todayButton={"오늘"}
                                            inline />
                                    )
                                }
                                  <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">오전/오후</InputLabel>
                                    <Select
                                        value={this.state.apm}
                                        onChange={this.handleChange.bind(this)}
                                        inputProps={{
                                            name: 'apm',
                                            id: 'apm-simple',
                                        }}
                                    >
                                         <MenuItem value={'오전'}>오전</MenuItem>
                                        <MenuItem value={'오후'}>오후</MenuItem>


                                    </Select>
                                </FormControl>

                            </TableCell>
                        </TableRow>


                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{textAlign:'center'}}colSpan={7}>

                                <Button
                                    variant="outlined" size="small" color="primary"
                                    onClick={this.regInput.bind(this)}>
                                    등록
                                </Button><br/>
                                {this.state.alert ? <font color="red">필수 항목을 기입해주세요.</font>:''}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }


}



export default withStyles(styles)(InputTable);