import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import "react-datepicker/dist/react-datepicker.css";

import {getWork,delWork,confirmWork,completeWork} from '../services/post.js';
import AddCommentLayer from './AddCommentLayer.js';

import TableSortLabel from '@material-ui/core/TableSortLabel';


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
    cell:{
        paddingRight:3,
        textAlign: 'center',
        width:160
    },

     cellContentsLeft:{
        paddingRight:3,

         minWidth:270
    }
});

class  InfoTable extends Component{

    constructor(props){
        super(props);
        this.state={
            page: 0,
            rowsPerPage: 20,
            fetching:false,
            data:[],
            cnt:0,
            order:'',
            orderBy:'',
            addCommentPop:false,

            selId:''
        }
        // console.log(this.props.Search)
    }
     handleRequestSort(property) {
        const orderBy = property;
        let order = 'desc';


        if ( orderBy =='reg_date' || orderBy=='expire_date' || orderBy=='complete_date'){
             if (this.state.orderBy === property && this.state.order === 'desc') {
              order = 'asc';
            }
                this.setState({order:order,orderBy:orderBy},function(){
             this.getWorks()
            })
        }




        // this.props.getData(order,orderBy)

      };
    componentWillMount(){
        this.getWorks()
    }

    handleChangePage(event, page) {
        // console.log(page)
        this.setState({ page:page },function(){
            this.getWorks()
        });
    };

    componentWillReceiveProps(nextProps){
        if ( nextProps.Reload==true ) {
            this.getWorks()
            this.props.Reloadhandler();
        }
        if ( nextProps.Search.init )
        {
              this.getWorks()
             this.props.SearchHandler();
        }
        if ( nextProps.Search.condi )
        {
            // console.log(nextProps.Search)
             this.getWorks(nextProps.Search)
             this.props.SearchHandler();

        }

    }

    handleChangeRowsPerPage (event) {
        this.setState({ rowsPerPage: event.target.value });
    };
    async getWorks(searchArg){
// console.log("1")
        this.setState({fetching:true})
        let res= ''
        if ( searchArg )
            res = await getWork(this.state.page,this.state.rowsPerPage,this.props.LoginUser,this.props.Position,this.state.order,this.state.orderBy,searchArg);
        else
            res = await getWork(this.state.page,this.state.rowsPerPage,this.props.LoginUser,this.props.Position,this.state.order,this.state.orderBy);

        // console.log(res)

        this.setState({fetching:false,data:res.data,cnt:res.count})
    }
    async _onDelete(id){

        var con_test = confirm("삭제 하시겠습니까?");
        if(con_test == true){
         let res = await delWork({'id':id});
            // console.log(res)
            if ( res.data.changedRows==1)
            {
                alert('삭제 되었습니다.');
                 this.getWorks()
            }

        }


    }


    async _onConfirm(id){
        var con_test = confirm("확인 하시겠습니까?");
        if(con_test == true){
         let res = await confirmWork({'id':id});
            // console.log(res)
            if ( res.data.changedRows==1)
            {
                alert('확인 되었습니다.');
                 this.getWorks()
            }

        }
    }

     async _onComplete(id){
        var con_test = confirm("완료 하시겠습니까?");
        if(con_test == true){
         let res = await completeWork({'id':id});
            // console.log(res)
            if ( res.data.changedRows==1)
            {
                alert('완료 되었습니다.');
                 this.getWorks()
            }

        }
    }
    _addComment(id){
        // console.log(id)
        this.setState({addCommentPop:true,selId:id})
    }
    _CommentHandler(){
        // console.log(comment)

        this.setState({addCommentPop:false},function(){
           this.getWorks()
        })


    }

    _showContents(id,contents,handle_date){

        let commentYn = handle_date==null ? true:false
        // console.log(commentYn)
        this.setState({addCommentPop:true,selId:id,selContents:contents,selCommentYn:commentYn})

    }


    render() {

        const { classes } = this.props;


        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <InfoTableHeadWrapped
                      order={this.state.order}
                      orderBy={this.state.orderBy}
                      onRequestSort={this.handleRequestSort.bind(this)}

                    />

                     <TableBody>
                         {
                             this.state.data.map(element=>{
                                 return <DetailRowWrapped showContents={this._showContents.bind(this)} position={this.props.Position} onComplete={this._onComplete.bind(this)} onConfirm={this._onConfirm.bind(this)} onDelete={this._onDelete.bind(this)} data={element} key={element.id}/>
                             })
                         }

                     </TableBody>
                     <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[10, 15, 20]}
                          colSpan={10}
                          count={this.state.cnt}
                          rowsPerPage={this.state.rowsPerPage}
                          page={this.state.page}
                          onChangePage={this.handleChangePage.bind(this)}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
                          ActionsComponent={TablePaginationActionsWrapped}
                        />
                      </TableRow>
                    </TableFooter>
                </Table>
                {this.state.addCommentPop ? <AddCommentLayer User={this.props.LoginUser} CommentYn={this.state.selCommentYn} Id={this.state.selId} Contents={this.state.selContents} CommentHandler={this._CommentHandler.bind(this)}/> :''}
            </Paper>
        );
    }


}

class DetailRow extends Component{

    constructor(props) {
        super(props);

    }

    render(){
          const { classes } = this.props;
          const file = `download/${this.props.data.filename}`

        return(
             <TableRow key={this.props.data.id}>
                 <TableCell className={classes.cell}>
                     {this.props.data.reg_date}<br/> <span style={{cursor:'pointer',color:'red'}}onClick={this.props.onDelete.bind(this,this.props.data.id)}>삭제</span>
                 </TableCell>

                 <TableCell className={classes.cell}>
                     {this.props.data.writer_name}
                 </TableCell>

                 <TableCell className={classes.cell}>
                     {this.props.data.company_name}
                 </TableCell>

                 <TableCell className={classes.cell}>
                     {this.props.data.company_emp}
                 </TableCell>

                 <TableCell className={classes.cellContentsLeft}>
                     <span  onClick={this.props.showContents.bind(this,this.props.data.id,this.props.data.contents,this.props.data.handle_date)} style={{cursor:'pointer',color:'blue'}}>
                             {this.props.data.contents.split('\n').map((item, key) => {
                                  return <span key={key}>{item}<br/></span>
                                })}


                         {}

                         ({this.props.data.cnt ? this.props.data.cnt : 0})</span>


                     {/*<br/><span  onClick={this.props.addComment.bind(this,this.props.data.id)} style={{cursor:'pointer',color:'blue'}}>댓글 추가</span>*/}
                     {/*<span  onClick={this.props.getComment.bind(this,this.props.data.id)} style={{cursor:'pointer',color:'blue'}}> / 댓글 보기</span>*/}
                 </TableCell>

                 <TableCell className={classes.cell}>
                     {this.props.data.filename ? <a target="_blank" href={file}>다운로드</a> :''}
                 </TableCell>

                 <TableCell className={classes.cell}>
                     {this.props.data.confirm_name}
                 </TableCell>


                 <TableCell className={classes.cell}>
                     {this.props.data.handle_date ? this.props.data.handle_date  :<span onClick={this.props.onConfirm.bind(this,this.props.data.id)} style={{cursor:'pointer',color:'blue'}}>확인</span>}
                 </TableCell>


                 <TableCell className={classes.cell}>
                     {this.props.data.expire_date} {this.props.data.expire_apm}
                 </TableCell>

                 <TableCell className={classes.cell}>

                     {this.props.data.complete_date ? this.props.data.complete_date  : this.props.position=='팀장' ? <span onClick={this.props.onComplete.bind(this,this.props.data.id)} style={{cursor:'pointer',color:'blue'}}>완료처리</span> : ''}
                 </TableCell>

             </TableRow>

        )

    }

}

const DetailRowWrapped = withStyles(styles, { withTheme: true })(
  DetailRow,
);
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
    constructor(props) {
        super(props);

    }

    handleFirstPageButtonClick(event) {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick (event ) {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick (event) {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick(event ) {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick.bind(this)}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick.bind(this)}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick.bind(this)}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick.bind(this)}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);




const rows = [
    { id: 'reg_date', numeric: true, disablePadding: false, label: '등록날짜' },
    { id: 'writer', numeric: false, disablePadding: false, label: '작성자' },
    { id: 'compay_name', numeric: false, disablePadding: false, label: '회사명' },
    { id: 'company_emp', numeric: false, disablePadding: false, label: '업체직원' },
    { id: 'contents', numeric: false, disablePadding: false, label: '상담내용' },
    { id: 'filename', numeric: false, disablePadding: false, label: '첨부파일' },
    { id: 'confirm', numeric: false, disablePadding: false, label: '확인자' },
    { id: 'handle_date', numeric: false, disablePadding: false, label: '확인일' },
    { id: 'expire_date', numeric: false, disablePadding: false, label: '처리기한' },
    { id: 'complete_date', numeric: false, disablePadding: false, label: '완료일' },
  ];


class InfoTableHead extends React.Component {
    createSortHandler(property) {
        // console.log(property)
      this.props.onRequestSort(property);
    };

    render() {
      const {  order, orderBy } = this.props;

    const { classes } = this.props;

      return (
        <TableHead>
          <TableRow>

            {rows.map(row => {
              return (
                <TableCell
                  key={row.id}
                  // numeric={row.numeric}
                  //  padding={row.disablePadding ? 'none' : 'default'}
                  className={classes.cell}
                  sortDirection={orderBy === row.id ? order : false}
                >

                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler.bind(this,row.id)}
                    >
                      {row.label}
                    </TableSortLabel>

                </TableCell>
              );
            }, this)}
          </TableRow>
        </TableHead>
      );
    }
  }


const InfoTableHeadWrapped = withStyles(styles, { withTheme: true })(
  InfoTableHead,
);

export default withStyles(styles)(InfoTable);