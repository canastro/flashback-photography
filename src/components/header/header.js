// @flow
import React from 'react';
import FlowerIcon from 'react-icons/lib/io/ios-flower';
import Link from 'gatsby-link';
import injectSheet from 'react-jss';
import {slide as Menu} from 'react-burger-menu';

import styles, {burgerStyles} from './styles';

type Props = {
  classes: Object
};

const isMobile = window.innerWidth <= 750;

/**
 * Header component
 */
class Header extends React.Component {
  props: Props;

  /**
   * Initialize state with isOpen false
   * @param {Object} props - react props
   */
  constructor(props) {
      super(props);

      this.state = {isOpen: false};
  }

  /**
   * Updates the state with the value sent from the hamburguer menu
   * @method handleMenuChange
   * @param {Object} state - menu state
   */
  handleMenuChange = (state: Object) => {
      this.setState(state);
  };

  /**
   * Sets the isOpen as false when a link is clicked
   * @method handleLinkClick
   */
  handleLinkClick = () => {
      this.setState({isOpen: false});
  };

  /**
   * Builds the menu
   * @method buildMenu
   * @returns {Node} react node
   */
  buildMenu() {
      const {classes} = this.props;

      const baseMenus = [
          <Link
              key="contact"
              onClick={this.handleLinkClick}
              to="/contact/"
              className={classes.link}
          >
        Contact
          </Link>,
          <Link
              key="about"
              onClick={this.handleLinkClick}
              to="/about/"
              className={classes.link}
          >
        About
          </Link>,
          <Link
              key="album"
              onClick={this.handleLinkClick}
              to="/albums/"
              className={classes.link}
          >
        Albums
          </Link>
      ];

      if (!isMobile) {
          return baseMenus;
      }

      return (
          <Menu
              className={classes.menu}
              right
              pageWrapId="page-wrap"
              outerContainerId="outer-container"
              styles={burgerStyles}
              isOpen={this.state.isOpen}
              onStateChange={this.handleMenuChange}
          >
              <Link to="/" onClick={this.handleLinkClick} className={classes.link}>
          Home
              </Link>

              {baseMenus}
          </Menu>
      );
  }

  /**
   * Returns header component
   * @method render
   * @returns {Node} React Node
   */
  render() {
      const {classes} = this.props;
      return (
          <div className={classes.root}>
              <div className={classes.wrapper}>
                  <Link to="/" className={classes.titleLink}>
                      <h1 className={classes.title}>
                          <FlowerIcon className={classes.icon} />
                          <span className={classes.titleSpan}>Helianthus</span>
                      </h1>
                  </Link>

                  <div>{this.buildMenu()}</div>
              </div>
          </div>
      );
  }
}

export default injectSheet(styles)(Header);
