// React & Styling.
import React from 'react'

// Redux & Actions
import { connect } from 'react-redux';
import { subCategoryClick, categoryClick, categoryWithSubsClick } from '../../../store/actions/sidenav';
// Components
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

const MenuComponent = (props) => {
    const { categories } = props.sidenav;
    return (
    <Menu
        style={{ width: 350 }}
        mode="inline">
        {
          categories.length >= 1 
          ? categories.map((category, index) => (
            <SubMenu
              key={index}
              title={
                <span 
                  onClick = {
                    category.sub.length >= 1 
                      ? () => props.categoryWithSubsClickHandler(category._doc._id, category._doc.name)
                      : () => props.categoryClickHandler(category._doc._id, category._doc.name)
                  }>
                  <Icon type="menu" />
                  <span>{category._doc ? category._doc.name : null}</span>
                </span>
              }>
                {
                  category.sub.length >= 1 
                  ? category.sub.map((sub, index) => (
                    <Menu.Item
                      onClick={() => props.subCategoryClickHandler(category._doc._id, category._doc.name, sub._id, sub.name)} 
                      key={index}>{sub.name}</Menu.Item>
                  ))
                  : null
                }
            </SubMenu>
          ))
          : null
        }
      </Menu>
    )
}


const mapStateToProps = state => {
  return {
    sidenav : state.sidenav
  }
}

const mapDispatchToProps = dispatch => {
  return {
    categoryClickHandler : (catID, catName) => dispatch(categoryClick(catID, catName)),
    categoryWithSubsClickHandler : (catID, catName) => dispatch(categoryWithSubsClick(catID, catName)),
    subCategoryClickHandler : (catID, catName, subID, subName) => dispatch(subCategoryClick(catID, catName, subID, subName))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);