import React, { Component } from "react";
import { Card, Table, Select, Input, Button, Icon } from "antd";
import { reqGetProducts, reqUpdateProductStatus } from "../../api";
import'./index.less'
export default class Product extends Component {
  state={
    //products=[],
    total:0  //初始值是0
  }
  columns=[
{title:'商品名称',
dataIndex:'name'
},
{
  title:'商品描述',
  dataIndex:'desc' 
},
{
  title:'商品价格',
  dataIndex:'price'
},
{
  title:'商品详情',
dataIndex:'detail'
},
{
  title:'状态',
  dataIndex:'status',
  render:()=>{
return (<div>
  <Button type='primary'>已上架</Button>
  已下架
</div>
  );
  }
  },
  {
title:'操作',
render:()=>{
  return (<div>
    <Button type="link" onClick={this.props}>详情</Button>
    <Button tyepe='link' onClick={this.props}>修改</Button>
  </div>
  );
  }
  }
  ]
  //获取商品数据
getProducts= (pageNum,pageSize)=>{
const result=reqGetProducts(pageNum,pageSize);
this.setState({
products:result.list,
total:result.total
})
}
shouAddCategoryFrom=()=>{
  this.props.history.push('./product/add')
}
//获取商品的前端分页展示一页三行显示
componentDidMount()
{ this.getProducts(1,3)}
  render() {
    const {product,total}=this.state
//value?是个对象包着的，是为什么 ，type=primary是为了表示选中的唯一的值么？还是主要按钮而已？？？？
    return( <div>
     < Card title={
       <div>
        < Select value={1}> 
        <Select.option value={1}>根据商品名称</Select.option>
        <Select.option value={2}>根据商品描述</Select.option>
        </Select>
        <Input placeholde='关键字' className='search-input'/>
        <Button type='primary'>搜索</Button>

       </div>
     }
     extra={
    <Button type='primary' onClick={this.showAddCategoryFrom}>
    <Icon type='plus'/>
        添加商品
          </Button>
     }
     >
     <Table cloumns ={this.columns}
      // dataSource={products}
       bordered
       rowkey='_id'
       paganatioan={{
        showQuickJumper:true,
        showSizeChanger:true,
        pageSizeOptions:[3,6,9,12],
        defaultPageSize:3,
        total:0,
        onChange:'this.getProducts',  //分页页码发生改变的事件
        onShowSizeChange:this.getProducts //pageSize的回调事件
        }}
        >
       
     </Table>
     </Card>
    </div>)
  }
}

