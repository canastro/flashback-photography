// @flow
import React from 'react';
import CameraRetroIcon from 'react-icons/lib/fa/camera-retro';
import Link from 'gatsby-link';
import injectSheet from 'react-jss';
import {slide as Menu} from 'react-burger-menu';

import styles, {burgerStyles} from './styles';

type Props = {
  classes: Object
};

/**
 * Header component
 */
export class Header extends React.Component {
  props: Props;

  /**
   * Initialize state with isOpen false
   * @param {Object} props - react props
   */
  constructor(props) {
      super(props);

      this.state = {
          isOpen: false
      };
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
   * Builds Links
   * @returns {Array<Node>} array
   */
  getLinks() {
      const {classes} = this.props;

      return [
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
  }

  /**
   * Returns header component
   * @method render
   * @returns {Node} React Node
   */
  render() {
      const {classes} = this.props;
      const links = this.getLinks();
      return (
          <div className={classes.root}>
              <div className={classes.wrapper}>
                  <Link to="/" className={classes.titleLink}>
                      <h1 className={classes.title}>
                          <CameraRetroIcon className={classes.icon} />
                          <span className={classes.titleSpan}>Flashback</span>
                      </h1>
                  </Link>

                  <div className={classes.desktopMenu}>{links}</div>

                  <div className={classes.mobileMenu}>
                      <Menu
                          className={classes.mobileMenu}
                          right
                          pageWrapId="page-wrap"
                          outerContainerId="outer-container"
                          styles={burgerStyles}
                          isOpen={this.state.isOpen}
                          onStateChange={this.handleMenuChange}
                      >
                          {[
                              <Link
                                  key="home"
                                  to="/"
                                  onClick={this.handleLinkClick}
                                  className={classes.link}
                              >
                  Home
                              </Link>,
                              ...links
                          ]}
                      </Menu>
                  </div>
              </div>
          </div>
      );
  }
}

export default injectSheet(styles)(Header);
